'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

const footerStyle = {
    background: 'linear-gradient(90deg, #1a2a6c, #b21f1f, #fdbb2d)', // Space-like gradient
    backgroundSize: '200% 200%', // Smooth animation for gradient
    boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.3)', // Soft shadow for depth
    color: '#fff', // White color for text
    textAlign: 'center',
    padding: '20px 0',
    fontFamily: 'Orbitron, sans-serif', // Futuristic font
    position: 'relative',
    width: '100%',
    bottom: 0, // Ensure it sticks to the bottom
} as React.CSSProperties;

const typographyStyle = {
    color: '#fff', // White color for text
    textShadow: '0px 0px 10px rgba(255, 255, 255, 0.8)', // Cosmic glow effect
    fontFamily: 'inherit', // Inherit font family from footer
} as React.CSSProperties;

const Footer: React.FC = () => {
    return (
        <Box sx={footerStyle}>
            <Typography variant="body2" sx={typographyStyle}>
                &copy; {new Date().getFullYear()} OrbitFind. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
