import { createContext, useContext, useState, ReactNode } from 'react';
import { TrainingSession, Meal, HealthAppointment } from '../types';

interface PetDataContextType {
  training: TrainingSession | null;
  meals: Meal[];
  appointments: HealthAppointment[];
  updateTraining: (training: TrainingSession) => void;
  addMeal: (meal: Meal) => void;
  addAppointment: (appointment: HealthAppointment) => void;
  deleteAppointment: (id: string) => void;
  loadPetData: (petId: string) => void;
}

const PetDataContext = createContext<PetDataContextType | undefined>(undefined);

export function PetDataProvider({ children }: { children: ReactNode }) {
  const [training, setTraining] = useState<TrainingSession | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [appointments, setAppointments] = useState<HealthAppointment[]>([]);

  const loadPetData = (petId: string) => {
    const trainingKey = `training_${petId}`;
    const mealsKey = `meals_${petId}`;
    const appointmentsKey = `appointments_${petId}`;

    const storedTraining = localStorage.getItem(trainingKey);
    const storedMeals = localStorage.getItem(mealsKey);
    const storedAppointments = localStorage.getItem(appointmentsKey);

    setTraining(storedTraining ? JSON.parse(storedTraining) : null);
    setMeals(storedMeals ? JSON.parse(storedMeals) : []);
    setAppointments(storedAppointments ? JSON.parse(storedAppointments) : []);
  };

  const updateTraining = (newTraining: TrainingSession) => {
    setTraining(newTraining);
    localStorage.setItem(`training_${newTraining.petId}`, JSON.stringify(newTraining));
  };

  const addMeal = (meal: Meal) => {
    const updatedMeals = [...meals, meal];
    setMeals(updatedMeals);
    localStorage.setItem(`meals_${meal.petId}`, JSON.stringify(updatedMeals));
  };

  const addAppointment = (appointment: HealthAppointment) => {
    const updatedAppointments = [...appointments, appointment];
    setAppointments(updatedAppointments);
    localStorage.setItem(`appointments_${appointment.petId}`, JSON.stringify(updatedAppointments));
  };

  const deleteAppointment = (id: string) => {
    const updatedAppointments = appointments.filter(a => a.id !== id);
    setAppointments(updatedAppointments);
    if (training) {
      localStorage.setItem(`appointments_${training.petId}`, JSON.stringify(updatedAppointments));
    }
  };

  return (
    <PetDataContext.Provider value={{ training, meals, appointments, updateTraining, addMeal, addAppointment, deleteAppointment, loadPetData }}>
      {children}
    </PetDataContext.Provider>
  );
}

export function usePetData() {
  const context = useContext(PetDataContext);
  if (!context) {
    throw new Error('usePetData must be used within PetDataProvider');
  }
  return context;
}
