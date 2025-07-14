"use client";
import Image from "next/image";
import bars from "../../public/bars.svg";
import search from "../../public/search.svg";
import avatar from "../../public/avatar.svg";
import { useContext } from "react";
import { UserContext } from "@/app/Provider";

const Navbar = ({ searchText, setSearchText }) => {
  const { session, signOut } = useContext(UserContext);

  return (
    <div className="flex items-center h-[56px] border-b w-full border-white px-3 sm:px-8 justify-between gap-7 sm:gap-20">
      <Image
        src={bars}
        height={39}
        width={39}
        alt="Menu button"
        className="cursor-pointer"
      />
      <div className="flex bg-white/52  p-1.5 rounded-[5px] gap-0.5 flex-grow max-w-[538px]">
        <Image src={search} height={25} width={25} alt="Seach button" />
        <input
          type="text"
          className="inline-block w-full focus:outline-none  text-primary"
          placeholder="Search for a note"
          name="Search"
          id="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Image
          src={session?.user?.user_metadata?.avatar_url || avatar}
          height={37}
          width={37}
          alt="Avatar"
          className="cursor-pointer rounded-4xl"
        />
        <button className="primary-btn cursor-pointer" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
