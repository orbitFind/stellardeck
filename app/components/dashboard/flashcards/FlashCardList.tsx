import React, { useEffect, useState } from 'react';
import Flashcard from '@/components/dashboard/flashcards/Flashcard';
import { useFlashcard } from '@/context/FlashcardContext';
import { Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Grid, Container } from '@mui/material';

interface FlashcardListProps {
    collectionId?: string; // Optional prop to filter flashcards by collection
}

const FlashcardList: React.FC<FlashcardListProps> = ({ collectionId }) => {
    const { flashcards, collections, getFlashcards, getCollections } = useFlashcard();
    const [selectedCollection, setSelectedCollection] = useState<string | undefined>(collectionId);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getData = async () => {
            // Fetch flashcards and collections when the component mounts
            await getFlashcards();
            await getCollections();
        }

        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle collection selection change
    const handleCollectionChange = (event: SelectChangeEvent<string>) => {
        setSelectedCollection(event.target.value as string);
    };

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Filter collections based on search term
    const filteredCollections = collections.filter(collection =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter flashcards by the selected collection if collectionId is provided
    const filteredFlashcards = flashcards
        .filter(flashcard => !selectedCollection || flashcard.collectionId === selectedCollection)
        .filter(flashcard =>
            flashcard.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            flashcard.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <Container maxWidth="lg" sx={{ p: 2 }}>
            <Box sx={{ mb: 4 }}>
                {/* Collection Filter */}
                <FormControl fullWidth margin="normal" sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: 1,
                    "& .MuiInputLabel-root": {
                        color: 'white', // Ensure label is white
                    },
                    "& .MuiInputLabel-shrink": {
                        color: 'white', // Ensure label stays white when shrunk
                    },
                    "& .MuiSelect-root": {
                        color: 'white', // Ensure select text is white
                    },
                    "& .MuiSelect-icon": {
                        color: 'white', // Ensure select arrow icon is white
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: 'rgba(255, 255, 255, 0.5)', // Border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: 'white', // Border color on hover
                    },
                }}>
                    <Select
                        value={selectedCollection || ''}
                        onChange={handleCollectionChange}
                        displayEmpty
                        sx={{
                            color: 'white', // Ensuring the selected text remains white
                        }}
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

                {/* Search Input */}
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    inputProps={{ style: { color: 'white' } }} // Ensure input text is white
                    InputLabelProps={{ style: { color: 'white' } }} // Ensure label text is white
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: 1,
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'rgba(255, 255, 255, 0.5)', // Border color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'white', // Border color on hover
                        },
                        "& .MuiInputBase-input": {
                            color: 'white', // Ensure input text is white
                        }
                    }}
                />
            </Box>

            {/* Flashcards List */}
            {filteredFlashcards.length > 0 ? (
                <Grid container spacing={4} alignItems="stretch">
                    {filteredFlashcards.map(flashcard => (
                        <Grid item key={flashcard.id} xs={12} sm={6} md={4} lg={3} sx={{ mx: 1 }}>
                            <Flashcard
                                id={flashcard.id}
                                question={flashcard.question}
                                answer={flashcard.answer}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h6" component="p" sx={{ fontFamily: 'Orbitron, sans-serif', color: 'white', mt: 2 }}>
                    No flashcards available.
                </Typography>
            )}
        </Container>
    );
};

export default FlashcardList;
