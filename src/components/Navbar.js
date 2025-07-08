import Image from "next/image";
import bars from "../../public/bars.svg";
import search from "../../public/search.svg";
import avatar from "../../public/avatar.svg";

const Navbar = () => {
  return (
    <div className="flex items-center h-[56px] border-b w-full border-white px-[31px] justify-between">
      <Image
        src={bars}
        alt="Menu button"
        width={40}
        height={40}
        className="cursor-pointer"
      />
      <div className="flex items-center bg-white/50 w-[40%] rounded-[5px] py-1.5 px-2 gap-1.5 text-white focus-within:bg-white focus-within:text-primary">
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.1374 15.1523L20.125 20.125M17.25 10.0625C17.25 14.032 14.032 17.25 10.0625 17.25C6.09295 17.25 2.875 14.032 2.875 10.0625C2.875 6.09295 6.09295 2.875 10.0625 2.875C14.032 2.875 17.25 6.09295 17.25 10.0625Z"
            stroke="currentColor"
            stroke-width="1.67"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <input
          type="text"
          className="placeholder-gray-900 text-base text-primary py-1 flex-grow px-2 focus:outline-none"
          placeholder="Search for a note"
        />
      </div>
      <Image
        src={avatar}
        alt="Menu button"
        width={40}
        height={40}
        className="cursor-pointer"
      />
    </div>
  );
};

export default Navbar;
