"use client";
import { dummyNotes } from "../lib/dummyData.js";
import trashIcon from "../../public/trash.svg";
import backIcon from "../../public/back.svg";
import Image from "next/image.js";
import { useEffect, useRef, useState } from "react";

const Notes = ({ searchText }) => {
  const [selectedNote, setselectedNote] = useState(null);
  const textAreaRef = useRef(null);
  const handleViewNote = (title, content) => {
    setselectedNote({
      title,
      content,
    });
  };

  const results = searchText
    ? dummyNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchText.toLowerCase()) ||
          note.content.toLowerCase().includes(searchText.toLowerCase())
      )
    : dummyNotes;

  useEffect(() => {
    if (selectedNote && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [selectedNote]);

  const handleChange = () => {};
  return (
    <div className="flex flex-col gap-5 mt-25 w-full max-sm:px-7.5 text-white">
      {selectedNote ? (
        <div className="border border-white rounded-[5px] py-4 px-7 mx-auto sm:w-[600px] md:w-[684px] lg:w-[900px] xl:w-[1146px]">
          <input
            value={selectedNote.title}
            type="text"
            className="block text-[27px] w-full focus:outline-none"
            name="title"
            id="title"
            onChange={handleChange}
          />
          <textarea
            value={selectedNote.content}
            type="text"
            className="text-base w-full
           mt-3.5 focus:outline-none min-h-[400px] resize-none pb-20 styled-scrollbar"
            ref={textAreaRef}
            name="Notes"
            id="notes"
            onChange={handleChange}
          />
          <div className="flex justify-end gap-4">
            <button
              className="hover:border-white border-b border-transparent cursor-pointer"
              onClick={() => setselectedNote(null)}
            >
              <Image
                src={backIcon}
                alt="Go back to list of notes"
                width={37}
                height={37}
              />
            </button>
            <button className="cursor-pointer hover:border-white border-b border-transparent">
              <Image
                src={trashIcon}
                alt="Go back to list of notes"
                width={40}
                height={40}
              />
            </button>
            <button className="primary-btn cursor-pointer">save</button>
          </div>
        </div>
      ) : (
        results.map((note, i) => (
          <div
            key={i}
            className="text-white border max-sm:w-full sm:w-[620px] md:w-[720px] xl:w-[1146px] overflow-hidden rounded-[5px] py-5 px-6.5 mx-auto flex items-center justify-between cursor-pointer"
            onClick={() => handleViewNote(note.title, note.content)}
          >
            <div className="max-w-[85%]">
              <h2 className="text-base font-medium hover:underline">
                {note.title}
              </h2>
              <p className="text-sm md:text-base mt-2.5 line-clamp-2 text-white/85">
                {note.content}
              </p>
            </div>
            <div className="shrink-0 cursor-pointer hover:border-white border-b border-transparent">
              <Image src={trashIcon} alt="Trash Icon" width={33} height={33} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;
