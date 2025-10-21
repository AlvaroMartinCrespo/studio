'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

const isBrowser = typeof window !== 'undefined';

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Only initialize Firebase on the client-side
    if (isBrowser) {
      return initializeFirebase();
    }
    // Return dummy/null services for server-side rendering
    return { firebaseApp: null, auth: null, firestore: null };
  }, []); // Empty dependency array ensures this runs only once

  // On the server, you might want to render a loader or nothing
  if (!firebaseServices.firebaseApp) {
    // Or just return the children if they don't strictly depend on Firebase for the initial render
    return <>{children}</>;
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp!}
      auth={firebaseServices.auth!}
      firestore={firebaseServices.firestore!}
    >
      {children}
    </FirebaseProvider>
  );
}
