"use client";
import {
  useState,
  createContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import supabase from "../../supabaseClient";
import { useRouter } from "next/navigation";
import axios from "axios";
import { sortNotesByDate } from "@/lib/utils";
import toast from "react-hot-toast";
import { trackSynchronousPlatformIOAccessInDev } from "next/dist/server/app-render/dynamic-rendering";

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

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: "https://note-taking-backend-llit.onrender.com",
    });
    if (session?.access_token) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${session.access_token}`;
    }
    return instance;
  }, [session?.access_token]);

  // API endpoint to create a new note
  const saveNote = async (title, content) => {
    try {
      if (!title || !content) {
        return toast.error("Please provide a title and content before saving.");
      }
      const response = await api.post("/api/createNotes", { title, content });
      setNotes((prev) => sortNotesByDate([...prev, response.data.note]));
    } catch (error) {
      console.error(
        "Error saving note:",
        error.response?.data || error.message
      );
    }
  };
  //API endpoint to get all the notes of a particular user
  const getAllNotes = useCallback(async () => {
    try {
      const response = await api.get("/api/getNotes");
      if (response.data.success) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error(
        "Cannot get all notes:",
        error.response?.data || error.message
      );
    }
  }, [api]);

  //API endpoint to update a specific note
  const updateNote = async (title, content, id) => {
    try {
      const response = await api.post(`api/updateNote/${id}`, {
        title,
        content,
      });
      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return {
            ...note,
            title: response.data.note.title,
            content: response.data.note.content,
          };
        }
        return note;
      });
      setNotes(updatedNotes);
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error("Cannot update note:", error.message);
    }
  };

  //API endpoint to delete a particular note
  const deleteNote = async (id) => {
    try {
      const response = await api.delete(`/api/deleteNote/${id}`);
      if (response.data.success) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        toast.success("Note deleted successfully!");
      }
    } catch (error) {
      console.error("Cannot delete note:", error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const value = {
    session,
    signUp,
    signOut,
    saveNote,
    getAllNotes,
    notes,
    setNotes,
    updateNote,
    deleteNote,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default AuthProvider;
