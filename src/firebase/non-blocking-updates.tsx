
'use client';
    
import {
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentReference,
  SetOptions,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';
import { toast } from '@/hooks/use-toast';

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function setDocumentNonBlocking(docRef: DocumentReference, data: any, options: SetOptions) {
  setDoc(docRef, data, options).catch(error => {
    const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'write', // or 'create'/'update' based on options
        requestResourceData: data,
    });
    errorEmitter.emit('permission-error', permissionError);
    toast({
        variant: "destructive",
        title: "Error de permisos",
        description: "No tienes permiso para realizar esta acción.",
    });
  })
}


/**
 * Initiates an addDoc operation for a collection reference.
 * Does NOT await the write operation internally.
 * Returns the Promise for the new doc ref, but typically not awaited by caller.
 */
export function addDocumentNonBlocking(colRef: CollectionReference, data: any) {
  const promise = addDoc(colRef, data)
    .catch(error => {
      const permissionError = new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: data,
      });
      errorEmitter.emit('permission-error', permissionError);
      toast({
          variant: "destructive",
          title: "Error de permisos",
          description: "No tienes permiso para crear este documento.",
      });
    });
  return promise;
}


/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function updateDocumentNonBlocking(docRef: DocumentReference, data: any) {
  updateDoc(docRef, data)
    .catch(error => {
       const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: data,
      });
      errorEmitter.emit('permission-error', permissionError);
      toast({
          variant: "destructive",
          title: "Error de permisos",
          description: "No tienes permiso para actualizar este documento.",
      });
    });
}


/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function deleteDocumentNonBlocking(docRef: DocumentReference) {
  deleteDoc(docRef)
    .catch(error => {
      const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
      toast({
          variant: "destructive",
          title: "Error de permisos",
          description: "No tienes permiso para eliminar este documento.",
      });
    });
}
