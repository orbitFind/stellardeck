import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFlashcard } from '@/context/FlashcardContext';
import CosmicButton from '@/components/layout/ui/CosmicButton';

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
            </Box>
        </Modal>
    );
};

export default CollectionSelectionModal;
