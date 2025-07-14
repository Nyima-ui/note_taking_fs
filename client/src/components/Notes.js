"use client";
import { dummyNotes } from "../lib/dummyData.js";
import trashIcon from "../../public/trash.svg";
import backIcon from "../../public/back.svg";
import Image from "next/image.js";
import { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from "@/app/Provider.js";

const Notes = ({ searchText }) => {
  const { notes, updateNote, deleteNote } = useContext(UserContext);
  const [isNoteSelected, setIsNoteSelected] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  const textAreaRef = useRef(null);
  const handleViewNote = (title, content, id) => {
    setIsNoteSelected(id);
    setUpdatedTitle(title);
    setUpdatedContent(content);
  };

  const results = searchText
    ? notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchText.toLowerCase()) ||
          note.content.toLowerCase().includes(searchText.toLowerCase())
      )
    : notes;

  useEffect(() => {
    if (isNoteSelected && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isNoteSelected]);

  return (
    <div className="flex flex-col gap-5 mt-25 w-full max-sm:px-7.5 text-white">
      {isNoteSelected ? (
        <div className="border border-white rounded-[5px] py-4 px-7 mx-auto sm:w-[600px] md:w-[684px] lg:w-[900px] xl:w-[1146px]">
          <input
            value={updatedTitle}
            type="text"
            className="block text-[27px] w-full focus:outline-none"
            name="title"
            id="title"
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedContent}
            type="text"
            className="text-base w-full
           mt-3.5 focus:outline-none min-h-[400px] resize-none pb-20 styled-scrollbar"
            ref={textAreaRef}
            name="Notes"
            id="notes"
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <div className="flex justify-end gap-4">
            <button
              className="hover:border-white border-b border-transparent cursor-pointer"
              onClick={() => setIsNoteSelected("")}
            >
              <Image
                src={backIcon}
                alt="Go back to list of notes"
                width={37}
                height={37}
              />
            </button>
            <button
              className="cursor-pointer hover:border-white border-b border-transparent"
              onClick={() => {
                deleteNote(isNoteSelected), setIsNoteSelected("");
              }}
            >
              <Image
                src={trashIcon}
                alt="Delete note button"
                width={40}
                height={40}
              />
            </button>
            <button
              className="primary-btn cursor-pointer"
              onClick={() => {
                updateNote(updatedTitle, updatedContent, isNoteSelected),
                  setIsNoteSelected("");
              }}
            >
              save
            </button>
          </div>
        </div>
      ) : (
        results.map((note, i) => (
          <div
            key={i}
            className="text-white border max-sm:w-full sm:w-[620px] md:w-[720px] xl:w-[1146px] overflow-hidden rounded-[5px] py-5 px-6.5 mx-auto flex items-center justify-between cursor-pointer"
          >
            <div
              className="max-w-[85%] flex-grow"
              onClick={() => handleViewNote(note.title, note.content, note._id)}
            >
              <h2 className="text-base font-medium hover:underline">
                {note.title}
              </h2>
              <p className="text-sm md:text-base mt-2.5 line-clamp-2 text-white/85">
                {note.content}
              </p>
            </div>
            <button
              className="shrink-0 cursor-pointer hover:border-white border-b border-transparent"
              onClick={() => deleteNote(note._id)}
            >
              <Image src={trashIcon} alt="Trash Icon" width={33} height={33} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;
