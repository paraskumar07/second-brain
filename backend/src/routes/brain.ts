import { Router } from "express";
import { LinkModel, ContentModel, UserModel } from "../db";
import { auth } from "../middleware";
import crypto from "crypto";

const router = Router();

router.post("/share", auth, async (req, res) => {
  try {
    let link = await LinkModel.findOne({ userId: req.userId });
    if (!link) {
      const hash = crypto.randomBytes(8).toString("hex");
      link = await LinkModel.create({ userId: req.userId, hash });
    }
    // Contract: "link": "link_to_open_brain"
    res.json({ link: `https://yourfrontend.com/brain/${link.hash}` });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:shareLink", async (req, res) => {
  try {
    const { shareLink } = req.params;
    const link = await LinkModel.findOne({ hash: shareLink });
    if (!link) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    const user = await UserModel.findById(link.userId);
    const content = await ContentModel.find({ userId: link.userId });
    res.status(200).json({
      username: user?.username,
      content: content.map(doc => ({
        id: doc._id,
        type: doc.type,
        link: doc.link,
        title: doc.title,
        tags: doc.tags
      }))
    });
  } catch {
    res.status(404).json({ message: "Invalid or expired share link" });
  }
});

export default router;
