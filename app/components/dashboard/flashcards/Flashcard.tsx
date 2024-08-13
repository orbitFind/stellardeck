import React, { useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import styles from './Flashcard.module.css'; // Import CSS module

interface FlashcardProps {
    question: string;
    answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        setFlipped(prev => !prev);
    };

    return (
        <Card
            sx={{
                margin: 2,
                padding: 0,
                position: 'relative',
                width: 300,
                height: 200,
                cursor: 'pointer',
                perspective: '1000px',
                overflow: 'hidden',
            }}
            onClick={handleClick}
        >
            <Box className={`${styles.flashcard} ${flipped ? styles.flipped : ''}`}>
                <Box className={styles.front}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {question}
                        </Typography>
                    </CardContent>
                </Box>
                <Box className={styles.back}>
                    <CardContent>
                        <Typography variant="body1">
                            {answer}
                        </Typography>
                    </CardContent>
                </Box>
            </Box>
        </Card>
    );
};

export default Flashcard;
