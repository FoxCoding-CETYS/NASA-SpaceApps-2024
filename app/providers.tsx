"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { Session } from "next-auth";


interface SessionProviderWrapperProps {
  children: React.ReactNode;
  session: Session | null; // Update the session type to Session | null
}

export default function SessionProviderWrapper({ children, session }: SessionProviderWrapperProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
