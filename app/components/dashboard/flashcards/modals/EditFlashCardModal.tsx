import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFlashcard } from '@/context/FlashcardContext';
import CosmicButton from '@/components/layout/ui/CosmicButton'; // Import the CosmicButton component
import { motion } from 'framer-motion'; // Import framer-motion

interface EditFlashcardModalProps {
    open: boolean;
    onClose: () => void;
    flashcardId: string;
    initialQuestion: string;
    initialAnswer: string;
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
};

const EditFlashcardModal: React.FC<EditFlashcardModalProps> = ({
    open,
    onClose,
    flashcardId,
    initialQuestion,
    initialAnswer,
}) => {
    const [question, setQuestion] = useState(initialQuestion);
    const [answer, setAnswer] = useState(initialAnswer);
    const [loading, setLoading] = useState(false);

    const { updateFlashcard } = useFlashcard();

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateFlashcard(flashcardId, { question, answer });
            onClose();
        } catch (error) {
            console.error("Error updating flashcard:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                style={{
                    width: 400,
                    background: 'linear-gradient(135deg, rgba(25, 25, 112, 0.9), rgba(0, 0, 0, 0.8))', // Cosmic gradient
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                    padding: '16px',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
                    position: 'relative', // For the IconButton
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
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontFamily: 'Orbitron, sans-serif' }}
                    gutterBottom
                >
                    Edit Flashcard
                </Typography>
                <Box component="form" onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}>
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
                            "& .MuiInputLabel-root": {
                                color: 'white',
                            },
                            "& .MuiInputLabel-shrink": {
                                color: 'white',
                            },
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
                            "& .MuiInputLabel-root": {
                                color: 'white',
                            },
                            "& .MuiInputLabel-shrink": {
                                color: 'white',
                            },
                        }}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <CosmicButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Save'}
                        </CosmicButton>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onClose}
                            sx={{
                                mt: 2, ml: 1, bgcolor: 'rgba(255, 0, 0, 0.5)',
                                '&:hover': {
                                    bgcolor: 'rgba(255, 0, 0, 0.7)'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </motion.div>
        </Modal >
    );
};

export default EditFlashcardModal;
