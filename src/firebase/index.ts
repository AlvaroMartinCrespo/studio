import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// Helper function to check if the code is running in a browser environment
const isBrowser = () => typeof window !== 'undefined';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  // Only run this on the client
  if (!isBrowser()) {
    // On the server, return a dummy object or handle as needed.
    // For this app, server-side rendering of Firebase content is not required.
    return { firebaseApp: null, auth: null, firestore: null };
  }

  if (!getApps().length) {
    // In a browser environment, we can safely initialize.
    return getSdks(initializeApp(firebaseConfig));
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './errors';
export * from './error-emitter';
export { FirebaseErrorListener } from '../components/FirebaseErrorListener';
