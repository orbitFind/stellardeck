"use client"

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { FlashcardProvider } from '@/context/FlashcardContext';
import FlashcardList from '@/components/dashboard/flashcards/FlashCardList';
import FlashcardModal from '@/components/dashboard/flashcards/modals/CreateFlashCardModal';
import CosmicButton from '@/components/layout/ui/CosmicButton';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateCollectionModal from '@/components/dashboard/flashcards/modals/CreateCollectionModal';
import { motion } from 'framer-motion';

const FlashcardsPage: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [collectionModalOpen, setCollectionModalOpen] = useState(false);

    const handleCollectionModalOpen = () => setCollectionModalOpen(true);
    const handleCollectionModalClose = () => setCollectionModalOpen(false);

    return (
        <ProtectedRoute>
            <FlashcardProvider>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    sx={{ p: 4, color: 'white' }}
                >
                    <Typography variant="h4" gutterBottom>
                        Flashcards
                    </Typography>
                    <Box
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        bgcolor={'rgba(255, 255, 255, 0.0)'}
                        border={'0px solid rgba(255, 255, 255, 0.2)'}
                    >
                        <CosmicButton
                            variant="contained"
                            color="primary"
                            onClick={() => setModalOpen(true)}
                            sx={{ mb: 2, mr: 1 }}
                        >
                            Create New Flashcard
                        </CosmicButton>
                    </Box>
                    <Box
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        bgcolor={'rgba(255, 255, 255, 0.0)'}
                        border={'0px solid rgba(255, 255, 255, 0.2)'}
                    >
                        <CosmicButton
                            onClick={handleCollectionModalOpen}
                            variant="contained"
                            color="primary"
                            sx={{ mb: 2 }}

                        >
                            Create New Collection
                        </CosmicButton>
                    </Box>

                    <CreateCollectionModal open={collectionModalOpen} onClose={handleCollectionModalClose} />

                    <FlashcardList />
                    <FlashcardModal open={modalOpen} onClose={() => setModalOpen(false)} />
                </Box>
            </FlashcardProvider>
        </ProtectedRoute>
    );
};

export default FlashcardsPage;
