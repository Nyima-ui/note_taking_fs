"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "./Provider";

const Authwrapper = ({ children }) => {
  const { session } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if(session === undefined) return; 
    if (session && router.pathname !== "/") {
      router.push("/");
    } else if (!session && router.pathname !== "/signup") {
      router.push("/signup");
    }
  }, [session, router]);
  return <>{children}</>;
};

export default Authwrapper;
