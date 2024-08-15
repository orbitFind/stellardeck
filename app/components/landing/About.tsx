'use client';

import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { SpaceBar } from '@mui/icons-material';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            sx={{
                p: 4,
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Orbitron, sans-serif',
                maxWidth: 1000,
                mx: 'auto',
                my: 5,
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ color: 'white', fontFamily: 'inherit' }}>
                StellarDeck: Your Galactic Learning Companion
            </Typography>
            <Card
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{
                    background: 'rgba(25, 25, 25, 0.9)',
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
