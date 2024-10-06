// app/providers.tsx
'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../amplify_outputs.json";
import CollapsibleSidebar from "@/components/collapsible-sidebar";

Amplify.configure(outputs);


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Authenticator>
      {({ signOut }) => (
        <NextUIProvider>
          <div className="flex h-screen flex-nowrap">
            <CollapsibleSidebar signOut={signOut || (() => { })} />
            <main className="flex-1 min-w-0 h-full overflow-auto">
              {/* Main content goes here */}
              {children}
            </main>
          </div>
        </NextUIProvider>
      )}
    </Authenticator>
  )
}