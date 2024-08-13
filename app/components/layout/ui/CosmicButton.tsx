import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { alpha } from '@mui/material/styles';

// Styles for the cosmic button
const cosmicButtonStyle = {
    background: 'linear-gradient(45deg, #1a2a6c, #fdbb2d)', // Space-like gradient
    backgroundSize: '200% 200%', // Smooth gradient animation
    borderRadius: '12px',
    boxShadow: `0 4px 8px ${alpha('#000', 0.5)}`, // Soft shadow for 3D effect
    color: '#fff',
    textShadow: '0px 0px 10px rgba(255, 255, 255, 0.8)', // Glowing text effect
    fontFamily: 'Orbitron, sans-serif', // Futuristic font
    transition: 'background 0.5s ease, transform 0.2s ease', // Smooth transition
    '&:hover': {
        background: 'linear-gradient(45deg, #b21f1f, #fdbb2d)', // Hover gradient
        backgroundSize: '200% 200%',
        transform: 'scale(1.05)', // Slight scale on hover
        boxShadow: `0 6px 12px ${alpha('#000', 0.5)}`, // Enhanced shadow on hover
    },
} as React.CSSProperties;

// Custom button component extending Material-UI Button
const CosmicButton: React.FC<ButtonProps> = (props) => {
    return (
        <Button
            {...props} // Inherit all props from Material-UI Button
            style={{ ...cosmicButtonStyle, ...props.style }} // Apply custom styles with overrides
        >
            {props.children}
        </Button>
    );
};

export default CosmicButton;
