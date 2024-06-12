"use client";

import FeedCard from "@/components/FeedCard";
import Sidebar from "../components/Sidebar";
import { GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";

export default function Home() {
  const handleLoginWithGoogle = useCallback((response: any) => {
    console.log(response); // Handle the response here
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <Sidebar />
        <div className="col-span-5 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
          <FeedCard />
        </div>
        <div className="col-span-3">
          <div className="border p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl">New to Twitter</h1>
            <GoogleLogin 
              onSuccess={handleLoginWithGoogle}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
