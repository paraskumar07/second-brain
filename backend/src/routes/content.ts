import { Router } from 'express';
import { ContentModel } from "../db";
import { auth, validate } from "../middleware";
import { z } from "zod";

const router = Router();

const postSchema = z.object({
  type: z.enum(["document", "tweet", "youtube", "link"]),
  link: z.string().min(1),
  title: z.string().min(1).max(100),
  tags: z.array(z.string()).optional()
});

router.post("/", auth, validate(postSchema), async (req, res) => {
  try {
    const { type, link, title, tags = [] } = req.body;
    const content = await ContentModel.create({
      type, link, title, tags,
      userId: req.userId
    });
    res.status(201).json({
      id: content._id,
      type, link, title, tags
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  const content = await ContentModel.find({ userId: req.userId });
  res.json({
    content: content.map(doc => ({
      id: doc._id,
      type: doc.type,
      link: doc.link,
      title: doc.title,
      tags: doc.tags
    }))
  });
});

const deleteSchema = z.object({
  contentId: z.string().length(24)
});

router.delete("/", auth, validate(deleteSchema), async (req, res) => {
  const { contentId } = req.body;
  const deleted = await ContentModel.findOneAndDelete({ _id: contentId, userId: req.userId });
  if (!deleted) {
    res.status(403).json({ message: "Trying to delete a doc you don’t own" });
    return;
  }
  res.status(200).json({ message: "Delete succeeded" });
});

export default router;
