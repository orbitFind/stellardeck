"use client"

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { FlashcardProvider } from '@/context/FlashcardContext';
import FlashcardList from '@/components/dashboard/flashcards/FlashCardList';
import FlashcardModal from '@/components/dashboard/flashcards/FlashCardModal';
import CosmicButton from '@/components/layout/ui/CosmicButton';

const FlashcardsPage: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <FlashcardProvider>
            <Box sx={{ p: 4, color: 'white' }}>
                <Typography variant="h4" gutterBottom>
                    Flashcards
                </Typography>
                <CosmicButton
                    variant="contained"
                    color="primary"
                    onClick={() => setModalOpen(true)}
                    sx={{ mb: 2 }}
                >
                    Create New Flashcard
                </CosmicButton>
                <FlashcardList />
                <FlashcardModal open={modalOpen} onClose={() => setModalOpen(false)} />
            </Box>
        </FlashcardProvider>
    );
};

export default FlashcardsPage;
