"use client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "utils/supabase/supabase";
import { UserType } from "./types/UserType";
import useSWR from "swr";

async function fetcher(url: string) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    },
  });
  return res.json();
}

export default function useUser() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const { data, error, isLoading } = useSWR(
    `/api/user/${session?.user.id}`,
    fetcher
  );
  const user: UserType = data?.user;

  function signUp({ email, password }: { email: string; password: string }) {
    return supabase.auth.signUp({ email, password }).catch((error) => {
      return error;
    });
  }

  function signIn({ email, password }: { email: string; password: string }) {
    return supabase.auth
      .signInWithPassword({ email, password })
      .catch((error) => {
        return error;
      });
  }

  function signOut() {
    supabase.auth.signOut();
  }

  return { session, user, error, isLoading, signUp, signIn, signOut };
}
