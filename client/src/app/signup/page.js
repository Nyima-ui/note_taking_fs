"use client";
import { useState, useEffect } from "react";
import logo from "../../../public/logo.svg";
import Image from "next/image";

import supabase from "../../../supabaseClient";

const Page = () => {
  const [state, setState] = useState("Sign Up");
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (provider) => {
    if (!["google", "github"].includes(provider)) {
      console.error("Unsupported provider:", provider);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
      });

      if (error) console.error("Error signin in:", error.message);
    } catch (error) {
      console.log("Unexpected error:", error);
    }
  };

  const toggleState = () => {
    if (state === "Sign Up") setState("Sign In");
    else setState("Sign Up");
  };
  return (
    <div className="h-screen w-full bg-primary py-10 px-7 text-white">
      <Image src={logo} alt="Logo" height={33} width={133} />
      <div className="border border-white rounded-[5px] px-10.5 mt-15 pb-10 max-w-[370px] mx-auto">
        <h3 className="text-[19px]  text-center mt-10">{state}</h3>
        <form className="mt-7.5 flex flex-col gap-6">
          {state === "Sign Up" && (
            <input
              type="text"
              name="Name"
              placeholder="Name"
              id="name"
              className="input"
            />
          )}
          <input
            type="Email"
            name="Email"
            placeholder="Email"
            id="name"
            className="input"
          />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            id="name"
            className="input"
          />
          <div className="flex justify-end">
            <button type="submit" className="primary-btn cursor-pointer">
              {state}
            </button>
          </div>
        </form>

        <div className="mt-10">
          <h3>{`${state} with:`}</h3>
          <div className="flex gap-5 mt-5">
            <button
              className="primary-btn cursor-pointer"
              onClick={() => signUp("google")}
            >
              Google
            </button>
            <button
              className="primary-btn cursor-pointer"
              onClick={() => signUp("github")}
            >
              Git Hub
            </button>
          </div>
        </div>
      </div>
      <p className="text-sm text-center mt-6">
        Already have an account?
        <span
          className="text-[#5232E2] cursor-pointer ml-1 hover:underline"
          onClick={toggleState}
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

export default Page;
