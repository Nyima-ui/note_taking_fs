import { dummyNotes } from "../lib/dummyData.js";
import trashIcon from '../../public/trash.svg'; 
import Image from "next/image.js";

const Notes = () => {


  return (
    <div className="flex flex-col gap-5 mt-25 w-full max-sm:px-7.5">
         {dummyNotes.map((note, i) => (
         <div key={i} className="text-white border max-sm:w-full sm:w-[620px] md:w-[768px] xl:w-[1146px] overflow-hidden rounded-[5px] py-5 px-6.5 mx-auto flex items-center justify-between cursor-pointer">
            <div className="max-w-[85%]">
                <h2 className="text-base font-medium hover:underline">{note.title}</h2>
                <p className="text-sm md:text-base mt-2.5 line-clamp-2 text-white/85">{note.content}</p>
            </div>
            <div className="shrink-0 cursor-pointer hover:border-white border-b border-transparent">
                <Image 
                  src={trashIcon}
                  alt="Trash Icon"
                  width={33}
                  height={33}
                />
            </div>
         </div>
    ))}
    </div>
  )
};

export default Notes;
