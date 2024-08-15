import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Flashcard.module.css'; // Import CSS module
import { useFlashcard } from '@/context/FlashcardContext';
import EditFlashcardModal from '@/components/dashboard/flashcards/modals/EditFlashCardModal';

interface FlashcardProps {
    id: string;
    question: string;
    answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ id, question, answer }) => {
    const [flipped, setFlipped] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { deleteFlashcard } = useFlashcard();

    const handleEditOpen = () => {
        setFlipped(false); // Stop the flip animation
        setIsModalOpen(true);
    };

    const handleEditClose = () => {
        setIsModalOpen(false);
    };

    const handleClick = () => {
        setFlipped(prev => !prev);
    };

    const handleDelete = async () => {
        setFlipped(false);
        await deleteFlashcard(id);
    };

    return (
        <Box className={styles.flashcardContainer} >
            <Card
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    perspective: '1000px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
                onClick={handleClick}
            >
                <Box className={`${styles.flashcard} ${flipped ? styles.flipped : ''}`}>
                    <Box className={styles.front}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Q. {question}
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
            <Box className={styles.cardActions}>
                <Tooltip title="Edit">
                    <IconButton onClick={handleEditOpen} color="primary">
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={handleDelete} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <EditFlashcardModal
                open={isModalOpen}
                onClose={handleEditClose}
                flashcardId={id}
                initialQuestion={question}
                initialAnswer={answer}
            />
        </Box>
    );
};

export default Flashcard;
