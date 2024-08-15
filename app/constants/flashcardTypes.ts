export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  collectionId: string;
  userId: string;
}

export interface Collection {
  id: string;
  name: string;
  userId: string;
}

export interface FlashcardContextType {
  flashcards: Flashcard[];
  collections: Collection[];
  addFlashcard: (flashcard: Flashcard) => Promise<void>;
  updateFlashcard: (
    id: string,
    updatedFlashcard: Partial<Omit<Flashcard, "id">>
  ) => Promise<void>;
  deleteFlashcard: (id: string) => Promise<void>;
  getFlashcards: () => Promise<void>;
  getCollections: () => Promise<void>;
  getFlashcardsByCollectionId: (collectionId: string) => Promise<Flashcard[]>;
}
