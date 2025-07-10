import Image from "next/image";
import bars from "../../public/bars.svg";
import search from "../../public/search.svg";
import avatar from "../../public/avatar.svg";

const Navbar = ({ searchText, setSearchText }) => {
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
      <Image
        src={avatar}
        height={37}
        width={37}
        alt="Avatar"
        className="cursor-pointer"
      />
    </div>
  );
};

export default Navbar;
