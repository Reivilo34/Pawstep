import { AppData, DogProfile, TrainingProgress, Meal, HealthData } from '../types';

const STORAGE_KEY = 'monCompagnonLoup';

const defaultData: AppData = {
  profile: {
    name: 'Ares',
    breed: 'Chien-loup tchèque',
    weight: 2.5,
    birthDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  training: {
    assis: 0,
    rappel: 0,
    couche: 0,
    lastReset: new Date().toDateString(),
  },
  meals: [],
  health: {
    nextVaccineDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString(),
    nextVetVisit: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

export const loadData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
  }
  return defaultData;
};

export const saveData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données:', error);
  }
};

export const updateProfile = (profile: DogProfile): void => {
  const data = loadData();
  data.profile = profile;
  saveData(data);
};

export const updateTraining = (training: TrainingProgress): void => {
  const data = loadData();
  data.training = training;
  saveData(data);
};

export const addMeal = (meal: Meal): void => {
  const data = loadData();
  data.meals.push(meal);
  saveData(data);
};

export const updateHealth = (health: HealthData): void => {
  const data = loadData();
  data.health = health;
  saveData(data);
};
