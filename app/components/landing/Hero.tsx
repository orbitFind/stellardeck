"use client";

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CosmicButton from '../layout/ui/CosmicButton';
import { useWaitlistModal } from '@/context/WaitlistFormContext';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
    const { openModal } = useWaitlistModal();
    const { ref, inView } = useInView({
        triggerOnce: true, // Trigger animation only once when entering view
        threshold: 0.1, // Percentage of the component that needs to be visible
    });

    return (
        <Box
            ref={ref}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: 2,
                my: 5,
                // Ensure animation is applied consistently
                transition: 'animation 1s ease-in-out',
            }}
            className={inView ? 'animate__animated animate__fadeInLeft' : ''}
        >
            <Typography
                variant="h2"
                component="h1"
                color="white"
                sx={{
                    fontFamily: 'Orbitron, sans-serif',
                }}
                gutterBottom
            >
                StellarDeck
            </Typography>
            <Typography
                variant="h6"
                color="white"
                sx={{
                    fontFamily: 'Orbitron, sans-serif',
                    mb: 5,
                }}
                gutterBottom
            >
                Explore customizable flashcards and collaborative study decks that are light-years ahead.
            </Typography>
            <CosmicButton variant="contained" color="primary" size="large" onClick={openModal}>
                Join Waitlist
            </CosmicButton>
        </Box>
    );
};

export default Hero;
