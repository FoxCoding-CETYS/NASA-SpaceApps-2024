// app/providers.tsx
'use client'
import React from 'react'
import {NextUIProvider} from '@nextui-org/react'
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Authenticator>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </Authenticator>
  )
}