"use client";

import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { SpaceBar } from '@mui/icons-material'; // Example icon

const About: React.FC = () => {
    return (
        <Box
            sx={{
                p: 4,
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Orbitron, sans-serif', // Apply cosmic font family
                // background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9))', // Cosmic background
                // borderRadius: 2,
                // boxShadow: 3,
                maxWidth: 1000,
                mx: 'auto',
                my: 5,
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ color: 'white', fontFamily: 'inherit' }}>
                StellarDeck: Your Galactic Learning Companion
            </Typography>
            <Card
                sx={{
                    background: 'rgba(25, 25, 25, 0.9)', // Slightly lighter cosmic background for card
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 3,
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    mx: 'auto',
                    maxWidth: '100%',
                }}
            >
                <SpaceBar fontSize="large" sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Blast off into the universe of knowledge with StellarDeck! Designed for space explorers, our flashcard SaaS platform blends cosmic wonders with effective learning.
                </Typography>
                <Typography variant="body2">
                    Dive into customizable flashcards, explore a vast library, and enjoy a cosmic collaboration experience. With secure, real-time updates and a visually stunning interface, StellarDeck makes learning as enjoyable as stargazing.
                </Typography>
            </Card>
        </Box>
    );
};

export default About;
