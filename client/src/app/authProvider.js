"use client";
import { useState, createContext, useEffect } from "react";
import supabase from "../../supabaseClient";
import { useRouter } from "next/navigation";

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
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
  
  const signUp = async ({ provider, email, password, name }) => {
    if (provider) {
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
    } else if (email && password) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name || "",
            },
          },
        });
        
        if (error) {
          console.error("Error signin up:", error.message);
        } else {
          console.log("User signed up:", data);
          router.push("/"); 
        }
      } catch (err) {
        console.log("Unexpected error:", err);
      }
    } else {
      console.error("Either provder or email/password must be provided");
    }
  };
  
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) router.push("/signup");
    else console.error("Error signin out:", error.message);
  };
  console.log(session); 
  
  const value = {
    session,
    signUp,
    signOut,
  };
  
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
};

export default AuthProvider;
