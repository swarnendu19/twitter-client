"use client";

import FeedCard from "@/components/FeedCard";
import Sidebar from "../components/Sidebar";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { VerifyUserGoogleTokenDocument } from "@/gql/graphql";

export default function Home() {
  const handleLoginWithGoogle = useCallback((cred: CredentialResponse) => {
   const  googleToken = cred.credential
   if(!googleToken) return toast.error(`Google token not found`);
   const {verifyGoogleToken} = await graphqlClient.request(VerifyUserGoogleTokenDocument,{token:googleToken}) 
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
