"use client";
import { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from "@/app/Provider";

const Newnote = () => {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const expandInput = () => setIsExpanded(true);

  const { saveNote, getAllNotes } = useContext(UserContext);

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const saveNewNote = (title, content) => {
    saveNote(title, content);
    setIsExpanded(false);
    setTitle("");
    setContent("");
    getAllNotes(); 
  };

  return (
    <div
      className="border border-white max-w-[350px] mx-auto mt-8 py-3 rounded-[5px] px-5 sm:max-w-[400px] md:max-w-[519px]"
      ref={containerRef}
    >
      <input
        type="text"
        placeholder="Title"
        className="text-white placeholder:text-white border-b pb-2.5 border-white/55 w-full focus:outline-none md:text-lg"
        value={title || ""}
        onChange={(e) => setTitle(e.target.value)}
        ref={inputRef}
        onFocus={expandInput}
      />
      <textarea
        className="text-white placeholder:text-white/50 w-full mt-4 rounded-[5px] focus:outline-none overflow-auto styled-scrollbar max-h-[300px] text-sm md:text-base"
        style={{ display: isExpanded ? "block" : "none" }}
        placeholder="Take a note..."
        ref={textareaRef}
        onInput={handleTextareaInput}
        value={content || ""}
        onChange={(e) => setContent(e.target.value)}
      />
      <div
        className="flex justify-end mt-2"
        style={{ display: isExpanded ? "block" : "none" }}
      >
        <button
          className="primary-btn cursor-pointer relative left-[80%]"
          onClick={() => saveNewNote(title, content)}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default Newnote;
