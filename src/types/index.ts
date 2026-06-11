export interface Pet {
  id: string;
  userId: string;
  name: string;
  breed: string;
  weight: number;
  birthDate: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface TrainingSession {
  id: string;
  petId: string;
  assis: number;
  rappel: number;
  couche: number;
  date: string;
}

export interface Meal {
  id: string;
  petId: string;
  type: 'Matin' | 'Midi' | 'Soirée' | 'Collation';
  quantity: number;
  date: string;
}

export interface HealthAppointment {
  id: string;
  petId: string;
  title: string;
  date: string;
  time?: string;
  type: 'vaccin' | 'visite' | 'autre';
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface DogProfile {
  name: string;
  breed: string;
  weight: number;
  birthDate: string;
  avatarUrl?: string;
}

export interface TrainingProgress {
  assis: number;
  rappel: number;
  couche: number;
  lastReset?: string;
}

export interface HealthData {
  nextVaccineDate: string;
  nextVetVisit: string;
}

export interface AppData {
  profile: DogProfile;
  training: TrainingProgress;
  meals: Meal[];
  health: HealthData;
}
