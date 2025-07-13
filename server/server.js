import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import noteRouter from "./routes/noteRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/api", noteRouter)

app.get("/", (req, res) => {
  res.send("Hello world, we got the. fiqr not");
});

app.listen(PORT, () => {
  console.log(`Server up and running at PORT ${PORT}`);
});




