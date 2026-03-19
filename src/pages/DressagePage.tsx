import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePetData } from '../context/PetDataContext';
import { CheckCircle } from 'lucide-react';
import { TrainingSession } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TrainingCardProps {
  title: string;
  progress: number;
  onIncrement: () => void;
}

function CircularProgress({ progress, max = 5 }: { progress: number; max?: number }) {
  const percentage = (progress / max) * 100;
  const strokeWidth = 8;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-28 h-28">
      <svg className="transform -rotate-90 w-full h-full">
        <circle cx="56" cy="56" r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="#10b981"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-emerald-900">
          {progress}/{max}
        </span>
      </div>
    </div>
  );
}

function TrainingCard({ title, progress, onIncrement }: TrainingCardProps) {
  const isComplete = progress >= 5;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
      <h3 className="text-xl font-bold text-emerald-900 mb-4">{title}</h3>
      <CircularProgress progress={progress} />
      <p className="text-sm text-gray-600 mt-2 mb-4">{isComplete ? 'Objectif atteint !' : 'FAIT'}</p>
      <button
        onClick={onIncrement}
        disabled={isComplete}
        className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
          isComplete ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-md'
        }`}
      >
        {isComplete ? (
          <>
            <CheckCircle size={20} />
            COMPLET
          </>
        ) : (
          <>CLIQUEZ : FAIT !</>
        )}
      </button>
    </div>
  );
}

export default function DressagePage() {
  const { currentPet } = useAuth();
  const { training, updateTraining } = usePetData();
  const [localTraining, setLocalTraining] = useState<TrainingSession | null>(null);

  useEffect(() => {
    if (currentPet && !training) {
      const today = new Date().toDateString();
      const newSession: TrainingSession = {
        id: uuidv4(),
        petId: currentPet.id,
        assis: 0,
        rappel: 0,
        couche: 0,
        date: today,
      };
      setLocalTraining(newSession);
      updateTraining(newSession);
    } else if (training) {
      setLocalTraining(training);
    }
  }, [training, currentPet, updateTraining]);

  const handleIncrement = (exerciseName: 'assis' | 'rappel' | 'couche') => {
    if (localTraining && localTraining[exerciseName] < 5) {
      const updated: TrainingSession = {
        ...localTraining,
        [exerciseName]: localTraining[exerciseName] + 1,
      };
      setLocalTraining(updated);
      updateTraining(updated);
    }
  };

  if (!localTraining) return null;

  return (
    <div className="pb-28 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-900 mb-6">Dressage Quotidien</h1>
        <div className="grid grid-cols-1 gap-4">
          <TrainingCard title="ASSIS" progress={localTraining.assis} onIncrement={() => handleIncrement('assis')} />
          <TrainingCard title="RAPPEL" progress={localTraining.rappel} onIncrement={() => handleIncrement('rappel')} />
          <TrainingCard title="COUCHÉ" progress={localTraining.couche} onIncrement={() => handleIncrement('couche')} />
        </div>
      </div>
    </div>
  );
}
