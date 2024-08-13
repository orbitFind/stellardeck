"use client";

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import CosmicButton from './ui/CosmicButton';
import { useWaitlistModal } from '@/context/WaitlistFormContext';

// Styles for the cosmic navbar
const navbarStyle = {
  background: 'linear-gradient(90deg, #1a2a6c, #b21f1f, #fdbb2d)', // Space-like gradient
  backgroundSize: '200% 200%', // Smooth animation for gradient
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', // Soft shadow
  transition: 'background 0.5s ease', // Smooth transition
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border for added depth
} as React.CSSProperties;

const typographyStyle = {
  color: '#fff', // White color for text
  textShadow: '0px 0px 10px rgba(255, 255, 255, 0.8)', // Cosmic glow effect
  fontFamily: 'Orbitron, sans-serif', // Futuristic font
} as React.CSSProperties;

const buttonStyle = {
  color: '#fff',
  borderColor: '#fff',
  textTransform: 'none', // Capitalize text
  '&:hover': {
    backgroundColor: alpha('#fff', 0.2), // Light background on hover
    borderColor: '#fff',
  },
  borderRadius: 2, // Rounded corners
} as React.CSSProperties;

const Navbar: React.FC = () => {
  const { openModal } = useWaitlistModal();

  return (
    <AppBar position="static" sx={navbarStyle}>
      <Toolbar>
        <Typography variant="h6" sx={typographyStyle}>
          StellarDeck
        </Typography>
        <CosmicButton variant="contained" sx={buttonStyle} style={{ marginLeft: 'auto' }} onClick={openModal}>
          Join Waitlist
        </CosmicButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
