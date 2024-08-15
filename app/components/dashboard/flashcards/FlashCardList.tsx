import React, { useEffect, useState } from 'react';
import Flashcard from '@/components/dashboard/flashcards/Flashcard';
import { useFlashcard } from '@/context/FlashcardContext';
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Select,
    FormControl,
    Grid,
    Container, SelectChangeEvent
} from '@mui/material';
import { motion } from 'framer-motion';

interface FlashcardListProps {
    collectionId?: string; // Optional prop to filter flashcards by collection
}

const FlashcardList: React.FC<FlashcardListProps> = ({ collectionId }) => {
    const { flashcards, collections, getFlashcards, getCollections } = useFlashcard();
    const [selectedCollection, setSelectedCollection] = useState<string | undefined>(collectionId);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getData = async () => {
            await getFlashcards();
            await getCollections();
        };

        getData();
    }, [getFlashcards, getCollections]);

    const handleCollectionChange = (event: SelectChangeEvent<string>) => {
        setSelectedCollection(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredCollections = collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredFlashcards = flashcards
        .filter((flashcard) => !selectedCollection || flashcard.collectionId === selectedCollection)
        .filter(
            (flashcard) =>
                flashcard.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                flashcard.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <Container maxWidth="lg" sx={{ p: 2 }}>
            <Box sx={{ mb: 4 }}>
                <FormControl fullWidth margin="normal" sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: 1,
                    "& .MuiInputLabel-root": {
                        color: 'white',
                    },
                    "& .MuiInputLabel-shrink": {
                        color: 'white',
                    },
                    "& .MuiSelect-root": {
                        color: 'white',
                    },
                    "& .MuiSelect-icon": {
                        color: 'white',
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: 'white',
                    },
                }}>
                    <Select
                        value={selectedCollection || ''}
                        onChange={handleCollectionChange}
                        displayEmpty
                        sx={{
                            color: 'white',
                        }}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>All Collections</em>
                        </MenuItem>
                        {filteredCollections.map((collection) => (
                            <MenuItem key={collection.id} value={collection.id}>
                                {collection.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    inputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: 1,
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'white',
                        },
                        "& .MuiInputBase-input": {
                            color: 'white',
                        }
                    }}
                />
            </Box>

            {filteredFlashcards.length > 0 ? (
                <Grid container spacing={4} alignItems="stretch">
                    {filteredFlashcards.map((flashcard, index) => (
                        <Grid
                            item
                            key={flashcard.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Flashcard
                                id={flashcard.id}
                                question={flashcard.question}
                                answer={flashcard.answer}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography
                    variant="h6"
                    component="p"
                    sx={{ fontFamily: 'Orbitron, sans-serif', color: 'white', mt: 2 }}
                >
                    No flashcards available.
                </Typography>
            )}
        </Container>
    );
};

export default FlashcardList;
