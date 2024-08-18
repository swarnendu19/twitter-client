"use client";

import FeedCard from "@/components/FeedCard";
import Sidebar from "../components/Sidebar";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { VerifyUserGoogleTokenDocument } from "@/gql/graphql";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) return toast.error('Google token not found');
    try {
      const { verifyGoogleToken } = await graphqlClient.request(VerifyUserGoogleTokenDocument, { token: googleToken });
      toast.success("Verified Success");
      console.log(verifyGoogleToken);
      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries(["current-user"]);
    } catch (error) {
      toast.error("Verification failed");
      console.error(error);
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <Sidebar />
        {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div>
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
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
