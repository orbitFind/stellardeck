"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode, use } from 'react';
import { auth } from '@/lib/firebase';
import { User as FirebaseUser, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';

interface AuthContextType {
    currentUser: FirebaseUser | null;
    login: (email: string, password: string) => Promise<UserCredential>;
    register: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    setCurrentUser: (user: FirebaseUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

    const register = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

    const logout = () => {
        signOut(auth);
        localStorage.removeItem('user');
        setCurrentUser(null);
        return Promise.resolve();
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, register, logout, setCurrentUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
