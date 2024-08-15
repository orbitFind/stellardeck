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

interface EditFlashcardModalProps {
    open: boolean;
    onClose: () => void;
    flashcardId: string;
    initialQuestion: string;
    initialAnswer: string;
}

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
                            variant="outlined"
                            color="secondary"
                            onClick={onClose}
                            sx={{ mt: 2, ml: 1 }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditFlashcardModal;
