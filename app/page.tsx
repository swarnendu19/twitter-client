import Image from "next/image";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
      <div>
        <div className="grid grid-cols-12 h-screen w-screen ">
         <Sidebar/>
        </div>
      </div>
  );
}
