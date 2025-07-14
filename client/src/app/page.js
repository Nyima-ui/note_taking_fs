"use client";
import Navbar from "@/components/Navbar";
import Newnote from "@/components/Newnote";
import Notes from "@/components/Notes";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./AuthProvider";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const { getAllNotes, session } = useContext(UserContext);
  useEffect(() => {
    if (session?.access_token) {
      getAllNotes();
    }
  }, [session, getAllNotes]);
  return (
    <div className="w-full pb-20 bg-primary relative min-h-screen">
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <Newnote />
      <Notes searchText={searchText} />
    </div>
  );
}
