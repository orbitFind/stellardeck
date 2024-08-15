import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFlashcard } from '@/context/FlashcardContext';
import CosmicButton from '@/components/layout/ui/CosmicButton';
import { motion } from 'framer-motion';

// Define animation properties
const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
};

interface CollectionSelectionModalProps {
    open: boolean;
    onClose: () => void;
    onCollectionSelected: (collectionId: string) => void;
}

const CollectionSelectionModal: React.FC<CollectionSelectionModalProps> = ({ open, onClose, onCollectionSelected }) => {
    const { collections } = useFlashcard(); // Get the list of collections
    const [selectedCollection, setSelectedCollection] = useState('');

    const handleSubmit = () => {
        onCollectionSelected(selectedCollection); // Pass the selected collection ID
        onClose(); // Close the modal after selection
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
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center content horizontally
                    justifyContent: 'center', // Center content vertically
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
                    Select a Collection
                </Typography>
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
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                >
                    Generate Flashcard
                </CosmicButton>
            </motion.div>
        </Modal>
    );
};

export default CollectionSelectionModal;
