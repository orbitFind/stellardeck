// src/context/FlashcardContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Flashcard {
    id: string;
    question: string;
    answer: string;
}

interface FlashcardContextType {
    flashcards: Flashcard[];
    addFlashcard: (flashcard: Flashcard) => void;
}

const FlashcardContext = createContext<FlashcardContextType | undefined>(undefined);

export const FlashcardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

    const addFlashcard = (flashcard: Flashcard) => {
        setFlashcards(prev => [...prev, flashcard]);
    };

    return (
        <FlashcardContext.Provider value={{ flashcards, addFlashcard }}>
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
