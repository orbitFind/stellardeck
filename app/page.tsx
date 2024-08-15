import { Box } from '@mui/material';
import { Hero, Features, About } from '@/components/landing';

const LandingPage = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                zIndex: 1,
            }}
        >
            <Hero />
            <About />
            <Features />
        </Box>
    );
};

export default LandingPage;
