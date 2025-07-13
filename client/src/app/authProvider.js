"use client";
import { useState, createContext, useEffect } from "react";
import supabase from "../../supabaseClient";
import { useRouter } from "next/navigation";
import axios from "axios";

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [notes, setNotes] = useState([]);

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

  const accessToken = session?.access_token;
  const api = axios.create({
    baseURL: "http://localhost:5000",
  });

  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  // API endpoint to create a new note
  const saveNote = async (title, content) => {
    try {
      const response = await api.post("/api/createNotes", { title, content });

      console.log("Note saved:", response.data);
    } catch (error) {
      console.error(
        "Error saving note:",
        error.response?.data || error.message
      );
    }
  };
  //API endpoint to get all the notes of a particular user
  const getAllNotes = async () => {
    try {
      const response = await api.get("/api/getNotes");
      if (response.data.success) {
        setNotes(response.data.notes);
      }
      console.log(response.data.success); 
    } catch (error) {
      console.error(
        "Cannot get all notes:",
        error.response?.data || error.message
      );
    }
  };

  const value = {
    session,
    signUp,
    signOut,
    saveNote,
    getAllNotes,
    notes, 
    setNotes
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default AuthProvider;
