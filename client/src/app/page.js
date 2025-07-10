"use client";
import Navbar from "@/components/Navbar";
import Newnote from "@/components/Newnote";
import Notes from "@/components/Notes";
import { useEffect, useState } from "react";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="w-full pb-20 bg-primary relative min-h-screen">
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <Newnote />
      <Notes searchText={searchText} />
    </div>
  );
}
