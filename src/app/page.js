import Navbar from "@/components/Navbar";
import Newnote from "@/components/Newnote";
import Notes from "@/components/Notes";

export default function Home() {
  return (
    <div className="w-full pb-20 bg-primary relative">
      <Navbar />
      <Newnote />
      <Notes />
    </div>
  );
}
