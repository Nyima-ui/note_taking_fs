import { Note } from "../models/Note.js";

//Create new note
export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(500).json({ message: "Missing data" });
    }

    const userId = req.user.sub;
    const newNote = await Note.create({
      title,
      content,
      userId,
    });

    res.status(200).json({
      success: true,
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.user.sub;

    const notes = await Note.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
