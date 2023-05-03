import cors from "cors";
import dotenv from "dotenv-safe";
import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";

const app = express();

dotenv.config();

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://frozenqxc:qwerty1@cluster0.apl2ul0.mongodb.net/test"
    );

    app.listen(5000, () => console.log(`Server ok. Port:${5000}`));
  } catch (error) {
    console.log(error);
  }
}

start();
