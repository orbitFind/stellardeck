'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { AccessAlarm, School, BarChart } from '@mui/icons-material';
import { motion } from 'framer-motion';

// Define the features data
const features = [
    {
        title: 'Create Custom Flashcards',
        description: 'Easily design and customize flashcards with intuitive tools and rich media support.',
        icon: <AccessAlarm fontSize="large" />,
    },
    {
        title: 'Study with AI-Powered Assistance',
        description: 'Leverage AI to help you study more effectively with personalized feedback and recommendations.',
        icon: <School fontSize="large" />,
    },
    {
        title: 'Track Your Progress',
        description: 'Monitor your learning progress with detailed analytics and performance metrics.',
        icon: <BarChart fontSize="large" />,
    },
];

const Features: React.FC = () => {
    return (
        <Box
            sx={{
                p: 4,
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Orbitron, sans-serif',
                borderRadius: 2,
                my: 5,
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ color: 'white', fontFamily: 'inherit' }}>
                Key Features
            </Typography>
            <Grid container spacing={4}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            component={motion.div}
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            sx={{
                                background: 'rgba(25, 25, 25, 0.8)',
                                borderRadius: 2,
                                boxShadow: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                p: 2,
                                color: 'white',
                                height: '100%', // Ensure the card takes up the full height of the grid item
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 64,
                                    height: 64,
                                    marginBottom: 2,
                                    border: '2px solid rgba(0, 255, 255, 0.5)',
                                    borderRadius: '50%',
                                    padding: 1,
                                }}
                            >
                                {feature.icon}
                            </Box>
                            <CardContent
                                sx={{
                                    flex: 1, // Allow CardContent to take up available space
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="h6" component="div" sx={{ color: 'white', fontFamily: 'inherit' }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'white', fontFamily: 'inherit' }}>
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Features;
