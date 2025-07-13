import { Schema, model } from "mongoose";

export const noteSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Note = model("Note", noteSchema);
