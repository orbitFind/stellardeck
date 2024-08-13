"use client";

import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useToast } from '@/context/ToastContext';
import CosmicButton from '../layout/ui/CosmicButton';
import { useWaitlistModal } from '@/context/WaitlistFormContext';


const UserDetailsModal: React.FC = () => {

    const { isOpen, closeModal } = useWaitlistModal();
    const { showToast } = useToast();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');

    const handleLocationChange = (value: string) => {
        setLocation(value);
    };

    const handleLocationSelect = (address: string) => {
        setLocation(address);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(name, email, location);
            await addDoc(collection(db, 'stellarWaitlist'), {
                name,
                email,
                location,
            });
            showToast('Successfully added to waitlist!', 'success');
        } catch (error) {
            console.error('Error adding document: ', error);
            showToast('Error adding to waitlist. Please try again later.', 'error');
        } finally {
            setName('');
            setEmail('');
            setLocation('');
            closeModal();
        }
    };

    return (
        <>
            <Modal open={isOpen} onClose={closeModal}>
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
                        onClick={closeModal}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" component="h2" sx={{
                        fontFamily: 'Orbitron, sans-serif',
                    }} gutterBottom>
                        Enter Your Details
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <Typography variant="body1" sx={{
                            fontFamily: 'Orbitron, sans-serif',
                        }} marginY={2}>
                            Location
                        </Typography>
                        <PlacesAutocomplete
                            value={location}
                            onChange={handleLocationChange}
                            onSelect={handleLocationSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                                <div>
                                    <TextField
                                        {...getInputProps({ placeholder: 'Start typing your location' })}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
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
                                    <div>
                                        {suggestions.map((suggestion) => {
                                            const suggestionProps = getSuggestionItemProps(suggestion);
                                            return (
                                                <Typography
                                                    {...suggestionProps}
                                                    key={suggestion.placeId}
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        cursor: 'pointer',
                                                        padding: 1,
                                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Solid background
                                                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                                                    }}
                                                >
                                                    {suggestion.description}
                                                </Typography>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <CosmicButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Submit
                        </CosmicButton>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default UserDetailsModal;
