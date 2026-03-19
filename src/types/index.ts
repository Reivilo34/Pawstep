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
