import Navbar from "@/components/Navbar";
import Newnote from "@/components/Newnote";
import Notes from "@/components/Notes";

export default function Home() {
  return (
    <div className="w-full bg-primary">
      <Navbar />
      <Newnote />
      <Notes />
    </div>
  );
}
