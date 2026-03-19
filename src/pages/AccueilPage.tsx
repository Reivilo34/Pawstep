import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePetData } from '../context/PetDataContext';
import { Plus, Settings, Lightbulb } from 'lucide-react';
import { Pet } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { calculateAge, formatDate, getDaysUntil } from '../utils/helpers';

export default function AccueilPage() {
  const navigate = useNavigate();
  const { user, pets, currentPet, addPet, selectPet } = useAuth();
  const { training, meals } = usePetData();
  const [showAddPet, setShowAddPet] = useState(false);
  const [newPetForm, setNewPetForm] = useState({
    name: '',
    breed: '',
    weight: '',
    birthDate: '',
  });

  useEffect(() => {
    if (currentPet) {
      // Load data for current pet
    }
  }, [currentPet]);

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPetForm.name && newPetForm.breed && newPetForm.weight && newPetForm.birthDate && user) {
      const pet: Pet = {
        id: uuidv4(),
        userId: user.id,
        name: newPetForm.name,
        breed: newPetForm.breed,
        weight: parseFloat(newPetForm.weight),
        birthDate: newPetForm.birthDate,
        createdAt: new Date().toISOString(),
      };
      addPet(pet);
      setNewPetForm({ name: '', breed: '', weight: '', birthDate: '' });
      setShowAddPet(false);
    }
  };

  const getTodaysMeals = () => {
    const today = new Date().toDateString();
    return meals.filter(m => new Date(m.date).toDateString() === today);
  };

  const getTodaysCalories = () => {
    return getTodaysMeals().reduce((sum, meal) => sum + meal.quantity, 0);
  };

  const getAdvice = () => {
    if (!currentPet) return '';
    const weight = currentPet.weight;
    if (weight < 5) {
      return 'Votre chiot a besoin de beaucoup de socialisation et d\'une alimentation équilibrée !';
    } else if (weight < 15) {
      return 'Augmentez progressivement les exercices physiques. Formation avancée recommandée !';
    }
    return 'Un exercice régulier est essentiel pour maintenir sa santé et son bien-être.';
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!currentPet && pets.length === 0) {
    return (
      <div className="pb-28 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-emerald-900 mb-6">Bienvenue, {user.name} !</h1>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🐕</div>
            <h2 className="text-2xl font-bold text-emerald-900 mb-2">Ajouter votre compagnon</h2>
            <p className="text-gray-600 mb-6">
              Commencez à suivre la santé, l'alimentation et l'éducation de votre animal de compagnie.
            </p>
            <button
              onClick={() => setShowAddPet(true)}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Ajouter mon compagnon
            </button>
          </div>
        </div>
        {showAddPet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Ajouter mon animal</h3>
              <form onSubmit={handleAddPet} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nom"
                  value={newPetForm.name}
                  onChange={(e) => setNewPetForm({ ...newPetForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Race"
                  value={newPetForm.breed}
                  onChange={(e) => setNewPetForm({ ...newPetForm, breed: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Poids (kg)"
                  value={newPetForm.weight}
                  onChange={(e) => setNewPetForm({ ...newPetForm, weight: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="date"
                  value={newPetForm.birthDate}
                  onChange={(e) => setNewPetForm({ ...newPetForm, birthDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowAddPet(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">
                    Annuler
                  </button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold">
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!currentPet) {
    return <div className="pb-28 px-4 py-8">Sélectionnez un animal</div>;
  }

  return (
    <div className="pb-28 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-emerald-900">Accueil</h1>
          <button onClick={() => navigate('/app/settings')} className="p-2 hover:bg-gray-100 rounded-full">
            <Settings size={24} className="text-emerald-700" />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-emerald-900">{currentPet.name}</h2>
              <p className="text-gray-600">{currentPet.breed}</p>
              <p className="text-gray-600 text-sm">Âge: {calculateAge(currentPet.birthDate)} • Poids: {currentPet.weight} kg</p>
            </div>
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-5xl">
              {currentPet.avatarUrl ? <img src={currentPet.avatarUrl} alt={currentPet.name} /> : '🐺'}
            </div>
          </div>

          {pets.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {pets.map(pet => (
                <button
                  key={pet.id}
                  onClick={() => selectPet(pet.id)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                    pet.id === currentPet.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pet.name}
                </button>
              ))}
            </div>
          )}

          {pets.length < 5 && (
            <button
              onClick={() => setShowAddPet(true)}
              className="mt-3 flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700"
            >
              <Plus size={18} />
              Ajouter un animal
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
            <p className="text-sm text-gray-600">Dressage</p>
            <p className="text-3xl font-bold text-emerald-900">
              {training?.assis || 0 + training?.rappel || 0 + training?.couche || 0}/15
            </p>
            <p className="text-xs text-gray-600 mt-1">exercices faits</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
            <p className="text-sm text-gray-600">Alimentation</p>
            <p className="text-3xl font-bold text-orange-900">{getTodaysCalories()}</p>
            <p className="text-xs text-gray-600 mt-1">grammes aujourd'hui</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl shadow-lg p-6 border border-emerald-200">
          <div className="flex items-start gap-3">
            <div className="bg-white p-3 rounded-full">
              <Lightbulb className="text-emerald-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-900 mb-2">Conseil pour {currentPet.name}</h3>
              <p className="text-gray-700">{getAdvice()}</p>
            </div>
          </div>
        </div>

        {showAddPet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Ajouter un animal</h3>
              <form onSubmit={handleAddPet} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nom"
                  value={newPetForm.name}
                  onChange={(e) => setNewPetForm({ ...newPetForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Race"
                  value={newPetForm.breed}
                  onChange={(e) => setNewPetForm({ ...newPetForm, breed: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Poids (kg)"
                  value={newPetForm.weight}
                  onChange={(e) => setNewPetForm({ ...newPetForm, weight: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="date"
                  value={newPetForm.birthDate}
                  onChange={(e) => setNewPetForm({ ...newPetForm, birthDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowAddPet(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">
                    Annuler
                  </button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold">
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
