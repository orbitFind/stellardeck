import { useState } from "react";
import { db } from "@/lib/firebase"; // Import your firebase setup
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

interface UseCreateCollectionResult {
  createCollection: (name: string) => Promise<void>;
  error: string | null;
  loading: boolean;
}

export const useCreateCollection = (): UseCreateCollectionResult => {
  const { currentUser } = useAuth(); // Get the current user's UID
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createCollection = async (name: string) => {
    if (!currentUser?.uid) {
      setError("User must be authenticated to create a collection");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newCollection = { name, userId: currentUser.uid };
      const docRef = await addDoc(
        collection(db, "flashcardCollections"),
        newCollection
      );
      console.log("Collection created with ID:", docRef.id);
    } catch (error) {
      console.error("Error creating collection in Firestore:", error);
      setError("Failed to create collection. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { createCollection, error, loading };
};
