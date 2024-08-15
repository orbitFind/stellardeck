"use client"

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@/context/AuthContext'; // Import AuthContext
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CosmicButton from '@/components/layout/ui/CosmicButton';
import Image from 'next/image';

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

const imageStyle = {
  marginRight: '10px',
} as React.CSSProperties;

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth(); // Use AuthContext
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={navbarStyle}>
      <Toolbar>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/logo.png" alt="Logo" style={imageStyle} width={30} height={30} />
            <Typography variant="h6" sx={typographyStyle}>
              StellarDeck
            </Typography>
          </div>
        </Link>
        {currentUser ? (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <IconButton sx={{ color: "white" }}>
                <DashboardIcon />
              </IconButton>
            </Link>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <PersonIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              slotProps={{
                paper: {
                  sx: {
                    bgcolor: 'background.default',
                    color: 'black',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  },
                },
              }}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link href="/auth/signin" style={{ marginLeft: 'auto', textDecoration: 'none' }}>
            <CosmicButton variant="contained" sx={buttonStyle}>
              Login
            </CosmicButton>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
