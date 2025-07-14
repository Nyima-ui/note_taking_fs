import { Note } from "../models/Note.js";

//Create new note
export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
     return  res.status(500).json({ message: "Missing data" });
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

//READ all the notes
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

//Update a particular note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
      { runValidators: true }
    );

    if (!updatedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Delete a particular note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.status(200).json({ success: true, note: deletedNote });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
