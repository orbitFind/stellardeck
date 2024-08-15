"use client"

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { FlashcardProvider, useFlashcard } from '@/context/FlashcardContext';
import FlashcardList from '@/components/dashboard/flashcards/FlashCardList';
import FlashcardModal from '@/components/dashboard/flashcards/modals/CreateFlashCardModal';
import CosmicButton from '@/components/layout/ui/CosmicButton';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateCollectionModal from '@/components/dashboard/flashcards/modals/CreateCollectionModal';

const FlashcardsPage: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [collectionModalOpen, setCollectionModalOpen] = useState(false);

    const handleCollectionModalOpen = () => setCollectionModalOpen(true);
    const handleCollectionModalClose = () => setCollectionModalOpen(false);


    return (
        <ProtectedRoute>
            <FlashcardProvider>
                <Box sx={{ p: 4, color: 'white' }}>
                    <Typography variant="h4" gutterBottom>
                        Flashcards
                    </Typography>
                    <CosmicButton
                        variant="contained"
                        color="primary"
                        onClick={() => setModalOpen(true)}
                        sx={{ mb: 2, mr: 1 }}
                    >
                        Create New Flashcard
                    </CosmicButton>
                    <CosmicButton onClick={handleCollectionModalOpen} variant="contained"
                        color="primary"
                        sx={{ mb: 2 }}>Create New Collection</CosmicButton>
                    <CreateCollectionModal open={collectionModalOpen} onClose={handleCollectionModalClose} />

                    <FlashcardList />
                    <FlashcardModal open={modalOpen} onClose={() => setModalOpen(false)} />
                </Box>
            </FlashcardProvider>
        </ProtectedRoute>
    );
};

export default FlashcardsPage;
