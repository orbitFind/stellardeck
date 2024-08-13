// src/components/FlashcardList.tsx

import React from 'react';
import Flashcard from '@/components/dashboard/flashcards/Flashcard';
import { useFlashcard } from '@/context/FlashcardContext';
import { Box } from '@mui/material';

const FlashcardList: React.FC = () => {
    const { flashcards } = useFlashcard();

    return (
        <Box>
            {flashcards.map(flashcard => (
                <Flashcard key={flashcard.id} question={flashcard.question} answer={flashcard.answer} />
            ))}
        </Box>
    );
};

export default FlashcardList;
