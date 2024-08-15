"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { db } from '@/lib/firebase'; // Import your firebase setup
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Collection, Flashcard, FlashcardContextType } from '@/constants/flashcardTypes';

const FlashcardContext = createContext<FlashcardContextType | undefined>(undefined);

export const FlashcardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);

    // Function to add a flashcard to a specific collection
    const addFlashcard = async (flashcard: Flashcard) => {
        try {
            const docRef = await addDoc(collection(db, 'flashcards'), flashcard);
            flashcard.id = docRef.id;
            // update the db with the new id
            await updateDoc(doc(db, 'flashcards', docRef.id), { id: docRef.id });
            setFlashcards(prev => [...prev, { ...flashcard }]);
        } catch (error) {
            console.error("Error adding flashcard to Firestore:", error);
        }
    };

    // Function to update a flashcard
    const updateFlashcard = async (id: string, updatedFlashcard: Partial<Omit<Flashcard, 'id'>>) => {
        try {
            const flashcardRef = doc(db, 'flashcards', id);
            await updateDoc(flashcardRef, updatedFlashcard);
            setFlashcards(prev =>
                prev.map(flashcard =>
                    flashcard.id === id ? { ...flashcard, ...updatedFlashcard } : flashcard
                )
            );
        } catch (error) {
            console.error("Error updating flashcard in Firestore:", error);
        }
    };

    // Function to delete a flashcard
    const deleteFlashcard = async (id: string) => {
        try {
            const docRef = doc(db, 'flashcards', id)
            await deleteDoc(docRef)
            setFlashcards(prev => prev.filter(flashcard => flashcard.id !== id));
        } catch (error) {
            console.error("Error deleting flashcard from Firestore:", error);
        }
    };

    const getFlashcards = async () => {
        try {
            const flashcardsCollection = collection(db, 'flashcards');
            const snapshot = await getDocs(flashcardsCollection);
            const flashcardsData = snapshot.docs.map(doc => ({
                id: doc.get('id'),
                ...doc.data() as Omit<Flashcard, 'id'>,
            }));
            setFlashcards(flashcardsData);
        } catch (error) {
            console.error("Error fetching flashcards from Firestore:", error);
        }
    };

    const getCollections = async () => {
        try {
            const collectionsCollection = collection(db, 'flashcardCollections');
            const snapshot = await getDocs(collectionsCollection);
            const collectionsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as Omit<Collection, 'id'>,
            }));

            setCollections(collectionsData);

        } catch (error) {
            console.error("Error fetching collections from Firestore:", error);
        }
    };

    const getFlashcardsByCollectionId = async (collectionId: string) => {
        try {
            const flashcardsCollection = collection(db, 'flashcards');
            const snapshot = await getDocs(flashcardsCollection);
            const flashcardsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as Omit<Flashcard, 'id'>,
            })).filter(flashcard => flashcard.collectionId === collectionId);
            return flashcardsData;
        } catch (error) {
            console.error("Error fetching flashcards from Firestore:", error);
            return [];
        }
    };

    return (
        <FlashcardContext.Provider value={{ flashcards, collections, addFlashcard, updateFlashcard, deleteFlashcard, getCollections, getFlashcards, getFlashcardsByCollectionId }}>
            {children}
        </FlashcardContext.Provider>
    );
};

export const useFlashcard = () => {
    const context = useContext(FlashcardContext);
    if (!context) {
        throw new Error('useFlashcard must be used within a FlashcardProvider');
    }
    return context;
};
