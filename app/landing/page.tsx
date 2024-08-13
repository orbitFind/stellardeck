import { Box } from '@mui/material';
import { Hero, Features, About } from '@/components/landing';
import UserDetailsModal from '@/components/landing/UserDetailsModal';

const LandingPage = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                zIndex: 1,
            }}
        >
            <UserDetailsModal />
            <Hero />
            <About />
            <Features />
        </Box>
    );
};

export default LandingPage;
