/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Hero from "@/components/Hero";

const page = () => {
  const [session, setSession] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const data = await getSession();
      if (data) setSession(data as unknown as string);
    };

    fetchSession();
  }, []);

  return (
    <div>
      <Hero />
    </div>
  );
};

export default page;

