import React, { useState } from 'react';
import { Modal, Box, TextField, Typography, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CosmicButton from '@/components/layout/ui/CosmicButton';
import { useFlashcard } from '@/context/FlashcardContext';
import { useAuth } from '@/context/AuthContext';
import { model, systemPrompt } from '@/lib/gemini'; // Import your Gemini functions
import CollectionSelectionModal from '@/components/dashboard/flashcards/modals/AIGenerateFlashCardModal'; // Import the new modal
import { useToast } from '@/context/ToastContext';
import { motion } from 'framer-motion';

interface FlashcardModalProps {
    open: boolean;
    onClose: () => void;
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
};

const FlashcardModal: React.FC<FlashcardModalProps> = ({ open, onClose }) => {
    const { addFlashcard, collections, getFlashcardsByCollectionId } = useFlashcard();
    const { currentUser } = useAuth(); // Get the current user's ID
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [selectedCollection, setSelectedCollection] = useState('');
    const [isCollectionModalOpen, setCollectionModalOpen] = useState(false);
    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (question && answer && selectedCollection && currentUser) {
            const newFlashcard = {
                id: '', // Add an empty string for the 'id' property
                question,
                answer,
                collectionId: selectedCollection,
                userId: currentUser.uid,
            };
            await addFlashcard(newFlashcard); // Firestore will generate and return the id here
            setQuestion('');
            setAnswer('');
            setSelectedCollection('');
            onClose(); // Close the modal after submission
        }
    };

    const handleGenerate = () => {
        setCollectionModalOpen(true); // Open the collection selection modal
    };

    const handleCollectionSelected = async (collectionId: string) => {
        try {
            const flashcards = await getFlashcardsByCollectionId(collectionId); // Fetch existing flashcards
            if (!flashcards.length) {
                showToast('No flashcards found in the selected collection. Please choose another collection.', 'error');
                return;
            }
            const prompt = `${systemPrompt}\n${flashcards.map(fc => `Q: ${fc.question}\nA: ${fc.answer}`).join('\n\n')}`;
            const response = await model.generateContent(prompt); // Generate new flashcard using the prompt
            if (response) {
                const res = await response.response.text();
                const cleanedString = res.replace(/```json|```|`/g, '').trim();
                const jsonRes = JSON.parse(cleanedString);
                const { question, answer } = jsonRes;
                console.log(question, answer);
                setQuestion(question);
                setAnswer(answer);
                setSelectedCollection(collectionId);
            }
        } catch (error) {
            showToast('An error occurred while generating the flashcard. Please try again.', 'error');
        }
    };

    return (
        <>
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
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Center content horizontally
                        justifyContent: 'center', // Center content vertically
                        position: 'relative', // Relative positioning for IconButton
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
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="collection-select-label" sx={{ color: 'white' }}>Collection</InputLabel>
                            <Select
                                labelId="collection-select-label"
                                value={selectedCollection}
                                onChange={(e) => setSelectedCollection(e.target.value)}
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'white',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: 'white',
                                    },
                                }}
                            >
                                {collections.map((collection) => (
                                    <MenuItem key={collection.id} value={collection.id}>
                                        {collection.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <CosmicButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Add Flashcard
                        </CosmicButton>
                        <CosmicButton
                            type="button"
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={handleGenerate}
                        >
                            Generate Flashcard
                        </CosmicButton>
                    </form>
                </motion.div>
            </Modal>
            <CollectionSelectionModal
                open={isCollectionModalOpen}
                onClose={() => setCollectionModalOpen(false)}
                onCollectionSelected={handleCollectionSelected}
            />
        </>
    );
};

export default FlashcardModal;
