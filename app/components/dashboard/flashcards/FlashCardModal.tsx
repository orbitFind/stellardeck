// src/components/FlashcardModal.tsx

import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFlashcard } from '@/context/FlashcardContext';
import CosmicButton from '@/components/layout/ui/CosmicButton';

interface FlashcardModalProps {
    open: boolean;
    onClose: () => void;
}

const FlashcardModal: React.FC<FlashcardModalProps> = ({ open, onClose }) => {
    const { addFlashcard } = useFlashcard();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (question && answer) {
            const newFlashcard = {
                id: Date.now().toString(),
                question,
                answer,
            };
            addFlashcard(newFlashcard);
            setQuestion('');
            setAnswer('');
            onClose(); // Close the modal after submission
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.default',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    background: 'linear-gradient(135deg, rgba(25, 25, 112, 0.9), rgba(0, 0, 0, 0.8))', // Cosmic gradient
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
                    overflow: 'auto',
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                    }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" component="h2" sx={{ fontFamily: 'Orbitron, sans-serif' }} gutterBottom>
                    Create New Flashcard
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Question"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                        sx={{
                            input: {
                                color: 'white',
                                '&::placeholder': {
                                    color: 'white',
                                },
                            },
                            fieldset: {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Solid background
                            borderRadius: 1,
                        }}
                    />
                    <TextField
                        label="Answer"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                        sx={{
                            input: {
                                color: 'white',
                                '&::placeholder': {
                                    color: 'white',
                                },
                            },
                            fieldset: {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Solid background
                            borderRadius: 1,
                        }}
                    />
                    <CosmicButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Add Flashcard
                    </CosmicButton>
                </form>
            </Box>
        </Modal>
    );
};

export default FlashcardModal;
