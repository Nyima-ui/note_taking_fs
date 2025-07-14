import express from "express";
const noteRouter = express.Router();
import { verifySupabaseToken } from "../middleware/auth.js";
import {
  createNotes,
  getNotes,
  updateNote,
  deleteNote,
} from "../controller/notesController.js";

noteRouter.post("/createNotes", verifySupabaseToken, createNotes);
noteRouter.get("/getNotes", verifySupabaseToken, getNotes);
noteRouter.post("/updateNote/:id", verifySupabaseToken, updateNote);
noteRouter.delete("/deleteNote/:id", verifySupabaseToken, deleteNote);

export default noteRouter;
