"use client";
import { useEffect, useRef, useState } from "react";

const Newnote = () => {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const textareaRef = useRef(null); 
  const [isExpanded, setIsExpanded] = useState(false);

  const expandInput = () => setIsExpanded(true);

  const handleTextareaInput = () => {
    const textarea = textareaRef.current; 
    if(textarea){
        textarea.style.height = "auto"; 
        textarea.style.height = `${textarea.scrollHeight}px`; 
    }
  }

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

  return (
    <div
      className="border border-white max-w-[350px] mx-auto mt-8 py-3 rounded-[5px] px-5 sm:max-w-[400px] md:max-w-[519px]"
      ref={containerRef}
    >
      {isExpanded ? (
        <>
          <input
            type="text"
            placeholder="Title"
            className="text-white placeholder:text-white border-b pb-2.5 border-white/55 w-full focus:outline-none md:text-lg"
          />
          <textarea
            className="text-white placeholder:text-white/50 w-full mt-4 rounded-[5px] focus:outline-none overflow-auto styled-scrollbar max-h-[300px] text-sm md:text-base"
            placeholder="Take a note..."
            ref={textareaRef}
            onInput={handleTextareaInput}
          />
          <div className="flex justify-end">
              <button className="primary-btn cursor-pointer">save</button>
          </div>
        </>
      ) : (
        <input
          ref={inputRef}
          type="text"
          placeholder="Take a note"
          name="Notes"
          className="placeholder-white text-white focus:outline-none inline-block w-full"
          onFocus={expandInput}
        />
      )}
    </div>
  );
};

export default Newnote;
