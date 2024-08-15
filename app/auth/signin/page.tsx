'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Typography,
    TextField,
    Container,
    Link
} from '@mui/material';
import CosmicButton from '@/components/layout/ui/CosmicButton';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';

const SignIn: React.FC = () => {
    const router = useRouter();
    const { showToast } = useToast();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredentials = await login(email, password);
            const user = userCredentials.user;

            if (!user) {
                showToast('Failed to sign in. Please try again.', 'error');
                return;
            }

            localStorage.setItem('user', JSON.stringify(user));
            router.push('/dashboard');
        } catch (err) {
            showToast('Failed to sign in. Please try again.', 'error');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, rgba(25, 25, 112, 0.9), rgba(0, 0, 0, 0.8))',
                    color: 'white',
                    borderRadius: 2,
                    p: 4,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{
                            input: {
                                color: 'white',
                                '&::placeholder': {
                                    color: 'white',
                                },
                            },
                            fieldset: {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: 'white',
                            },
                            "& .MuiInputLabel-shrink": {
                                color: 'white',
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{
                            input: {
                                color: 'white',
                                '&::placeholder': {
                                    color: 'white',
                                },
                            },
                            fieldset: {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: 1,
                            "& .MuiInputLabel-root": {
                                color: 'white',
                            },
                            "& .MuiInputLabel-shrink": {
                                color: 'white',
                            },
                        }}
                    />
                    <CosmicButton type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                        Sign In
                    </CosmicButton>
                </form>
                <Typography variant="body2" color="white" sx={{ mt: 2 }}>
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/register" color="secondary" underline="hover">
                        Register
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default SignIn;
