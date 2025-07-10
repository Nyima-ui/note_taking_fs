import { Schema, model } from "mongoose";

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
