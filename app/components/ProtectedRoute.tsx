import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser, setCurrentUser } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                const user = JSON.parse(storedUser);
                setCurrentUser(user);
            } else {
                router.push('/auth/signin');
            }
        } catch (err) {
            console.error(err);
            router.push('/auth/signin');
        }

    }, []);

    if (!currentUser) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
