"use client";

import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { AccessAlarm, School, BarChart } from '@mui/icons-material'; // Replace with appropriate icons

// Define the features data
const features = [
    {
        title: 'Create Custom Flashcards',
        description: 'Easily design and customize flashcards with intuitive tools and rich media support.',
        icon: <AccessAlarm fontSize="large" />, // Replace with appropriate icon
    },
    {
        title: 'Study with AI-Powered Assistance',
        description: 'Leverage AI to help you study more effectively with personalized feedback and recommendations.',
        icon: <School fontSize="large" />, // Replace with appropriate icon
    },
    {
        title: 'Track Your Progress',
        description: 'Monitor your learning progress with detailed analytics and performance metrics.',
        icon: <BarChart fontSize="large" />, // Replace with appropriate icon
    },
];

const Features: React.FC = () => {
    return (
        <Box
            sx={{
                p: 4,
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Orbitron, sans-serif', // Apply cosmic font family
                borderRadius: 2,
                // background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))', // Space-like background
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
                            sx={{
                                background: 'rgba(25, 25, 25, 0.8)', // Lighter cosmic background for card
                                borderRadius: 2,
                                boxShadow: 3,
                                transition: 'all 0.3s ease', // Smooth transition for hover effect
                                '&:hover': {
                                    boxShadow: '0px 8px 16px rgba(0, 255, 255, 0.5)', // Light cyan shadow
                                    transform: 'scale(1.05)', // Slightly enlarge the card on hover
                                },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                p: 2,
                                color: 'white', // Ensure card text is white
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
                                    border: '2px solid rgba(0, 255, 255, 0.5)', // Light cyan border
                                    borderRadius: '50%', // Rounded icon container
                                    padding: 1, // Add padding inside the border
                                }}
                            >
                                {feature.icon}
                            </Box>
                            <CardContent>
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
