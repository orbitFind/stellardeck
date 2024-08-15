import React, { useState } from 'react';
import { Modal, Box, TextField, Typography, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CosmicButton from '@/components/layout/ui/CosmicButton';
import { useCreateCollection } from '@/hooks/useCreateCollection'; // Adjust the path as needed
import { motion } from 'framer-motion';

// Define animation properties
const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
};

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
        <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                style={{
                    position: 'relative', // Change to relative to position absolute children properly
                    width: 400,
                    backgroundColor: 'background.default',
                    borderRadius: 2,
                    boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.5)',
                    padding: 4,
                    background: 'linear-gradient(135deg, rgba(25, 25, 112, 0.9), rgba(0, 0, 0, 0.8))', // Cosmic gradient
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center content horizontally
                    justifyContent: 'center', // Center content vertically
                    transform: 'translate(-50%, -50%)',
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
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
            </motion.div>
        </Modal>
    );
};

export default CreateCollectionModal;
