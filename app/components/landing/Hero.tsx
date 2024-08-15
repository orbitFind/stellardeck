'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import CosmicButton from '../layout/ui/CosmicButton';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: 2,
                my: 5,
            }}
        >
            <Typography
                variant="h2"
                color="white"
                sx={{
                    fontFamily: 'Orbitron, sans-serif',
                }}
                gutterBottom
                component={motion.div}
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7 }}
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
                component={motion.div}
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7 }}
            >
                Explore customizable flashcards and collaborative study decks that are light-years ahead.
            </Typography>
            <Box whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} component={motion.div}>
                <CosmicButton

                    variant="contained"
                    color="primary"
                    size="large"
                    href="/dashboard"
                >
                    Get Started
                </CosmicButton>
            </Box>

        </Box>
    );
};

export default Hero;
