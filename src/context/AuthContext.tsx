import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Pet } from '../types';

interface AuthContextType {
  user: User | null;
  pets: Pet[];
  currentPet: Pet | null;
  login: (email: string, name: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
  addPet: (pet: Pet) => void;
  selectPet: (petId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [pets, setPets] = useState<Pet[]>(() => {
    const stored = localStorage.getItem('pets');
    return stored ? JSON.parse(stored) : [];
  });

  const [currentPet, setCurrentPet] = useState<Pet | null>(() => {
    const stored = localStorage.getItem('currentPet');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, name: string) => {
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      name,
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const register = (email: string, name: string) => {
    login(email, name);
  };

  const logout = () => {
    setUser(null);
    setCurrentPet(null);
    localStorage.removeItem('user');
    localStorage.removeItem('currentPet');
  };

  const addPet = (pet: Pet) => {
    const newPets = [...pets, pet];
    setPets(newPets);
    setCurrentPet(pet);
    localStorage.setItem('pets', JSON.stringify(newPets));
    localStorage.setItem('currentPet', JSON.stringify(pet));
  };

  const selectPet = (petId: string) => {
    const pet = pets.find(p => p.id === petId);
    if (pet) {
      setCurrentPet(pet);
      localStorage.setItem('currentPet', JSON.stringify(pet));
    }
  };

  return (
    <AuthContext.Provider value={{ user, pets, currentPet, login, register, logout, addPet, selectPet }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
