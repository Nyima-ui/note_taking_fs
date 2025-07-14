


//helper function to sort notes from latest to oldest
export const sortNotesByDate = (notesArray) => {
  return [...notesArray].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};
