import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world, we got the. fiqr not");
});

app.listen(PORT, () => {
  console.log(`Server up and running at PORT ${PORT}`);
});




