import express from "express";
const noteRouter = express.Router();
import { verifySupabaseToken } from "../middleware/auth.js";
import { createNotes, getNotes } from "../controller/notesController.js";

noteRouter.post("/createNotes", verifySupabaseToken, createNotes);
noteRouter.get("/getNotes", verifySupabaseToken, getNotes);

export default noteRouter;
