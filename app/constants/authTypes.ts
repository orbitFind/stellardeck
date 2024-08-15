import { User as FirebaseUser, UserCredential } from "firebase/auth";
import { ReactNode } from "react";

export interface AuthContextType {
  currentUser: FirebaseUser | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  setCurrentUser: (user: FirebaseUser) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
