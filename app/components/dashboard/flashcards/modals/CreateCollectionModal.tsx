import React, { useState } from 'react';
import { Modal, Box, TextField, Typography, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CosmicButton from '@/components/layout/ui/CosmicButton';
import { useCreateCollection } from '@/hooks/useCreateCollection'; // Adjust the path as needed

interface CreateCollectionModalProps {
    open: boolean;
    onClose: () => void;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({ open, onClose }) => {
    const [collectionName, setCollectionName] = useState('');
    const { createCollection, error, loading } = useCreateCollection();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (collectionName.trim() === '') {
            return;
        }
        await createCollection(collectionName);
        setCollectionName('');
        onClose(); // Close the modal after submission
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
                <Typography variant="h6" component="h2" sx={{ fontFamily: 'Orbitron, sans-serif' }} gutterBottom>
                    Create New Collection
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Collection Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={collectionName}
                        onChange={(e) => setCollectionName(e.target.value)}
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
                    <CosmicButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Add Collection'}
                    </CosmicButton>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateCollectionModal;
