import { useState } from 'react';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { Meal } from '../types';
import { isToday } from '../utils/helpers';

interface FeedingSectionProps {
  meals: Meal[];
  onAddMeal: (meal: Meal) => void;
}

const mealTypes: Array<'Matin' | 'Midi' | 'Soirée' | 'Collation'> = ['Matin', 'Midi', 'Soirée', 'Collation'];

export default function FeedingSection({ meals, onAddMeal }: FeedingSectionProps) {
  const [mealType, setMealType] = useState<'Matin' | 'Midi' | 'Soirée' | 'Collation'>('Matin');
  const [quantity, setQuantity] = useState<string>('');

  const todaysMeals = meals.filter(meal => isToday(meal.date));
  const totalToday = todaysMeals.reduce((sum, meal) => sum + meal.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity && parseFloat(quantity) > 0) {
      const newMeal: Meal = {
        id: Date.now().toString(),
        type: mealType,
        quantity: parseFloat(quantity),
        date: new Date().toISOString(),
      };
      onAddMeal(newMeal);
      setQuantity('');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-emerald-900 mb-4">Suivi Alimentation</h2>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type de Repas
            </label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value as typeof mealType)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            >
              {mealTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantité (g)
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ex: 150"
              min="0"
              step="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} />
            Enregistrer le repas
          </button>
        </form>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-bold text-emerald-900 mb-3">Journal d'aujourd'hui</h3>

          {todaysMeals.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucun repas enregistré aujourd'hui</p>
          ) : (
            <div className="space-y-2">
              {todaysMeals.map(meal => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between bg-emerald-50 px-4 py-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-emerald-600" size={20} />
                    <span className="font-semibold text-emerald-900">{meal.type}</span>
                  </div>
                  <span className="text-gray-700 font-medium">{meal.quantity} g</span>
                </div>
              ))}
            </div>
          )}

          {todaysMeals.length > 0 && (
            <div className="mt-4 bg-emerald-600 text-white px-4 py-3 rounded-lg flex items-center justify-between">
              <span className="font-bold">Total du jour</span>
              <span className="text-xl font-bold">{totalToday} g</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
