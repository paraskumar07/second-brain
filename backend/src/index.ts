import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import { PORT } from "./config";
import authRoutes from "./routes/auth";
import contentRoutes from "./routes/content";
import brainRoutes from "./routes/brain";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Mount routers (only ONCE per router)
app.use("/api/v1", authRoutes);       // /signup and /signin are inside authRoutes
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/brain", brainRoutes);


app.get("/", (_req, res) => {
  res.send("Second Brain API is running.");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
});
