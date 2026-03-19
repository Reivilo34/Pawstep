import { useState } from 'react';
import { Calendar, Syringe, Stethoscope, CreditCard as Edit2 } from 'lucide-react';
import { HealthData } from '../types';
import { formatDate, getDaysUntil } from '../utils/helpers';

interface HealthSectionProps {
  health: HealthData;
  onUpdate: (health: HealthData) => void;
}

export default function HealthSection({ health, onUpdate }: HealthSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHealth, setEditedHealth] = useState(health);

  const vaccineDays = getDaysUntil(health.nextVaccineDate);
  const vetDays = getDaysUntil(health.nextVetVisit);

  const handleSave = () => {
    onUpdate(editedHealth);
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-emerald-900 mb-4">Santé & Rendez-vous</h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Syringe className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-emerald-900">Vaccin Prochain</h3>
            </div>
          </div>

          <div className="pl-14">
            <p className="text-gray-600 text-sm mb-1">Date prévue</p>
            <p className="text-xl font-bold text-emerald-900 mb-2">
              {formatDate(health.nextVaccineDate)}
            </p>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${
              vaccineDays <= 7
                ? 'bg-red-100 text-red-700'
                : vaccineDays <= 14
                ? 'bg-orange-100 text-orange-700'
                : 'bg-emerald-100 text-emerald-700'
            }`}>
              <Calendar size={14} />
              {vaccineDays > 0 ? `J-${vaccineDays}` : vaccineDays === 0 ? "Aujourd'hui" : 'En retard'}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Stethoscope className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-emerald-900">Visite Vétérinaire</h3>
            </div>
          </div>

          <div className="pl-14">
            <p className="text-gray-600 text-sm mb-1">Date prévue</p>
            <p className="text-xl font-bold text-emerald-900 mb-2">
              {formatDate(health.nextVetVisit)}
            </p>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${
              vetDays <= 7
                ? 'bg-red-100 text-red-700'
                : vetDays <= 14
                ? 'bg-orange-100 text-orange-700'
                : 'bg-emerald-100 text-emerald-700'
            }`}>
              <Calendar size={14} />
              {vetDays > 0 ? `J-${vetDays}` : vetDays === 0 ? "Aujourd'hui" : 'En retard'}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-md font-bold"
      >
        <Edit2 size={18} />
        Modifier les dates
      </button>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">Modifier les rendez-vous</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Date du prochain vaccin
                </label>
                <input
                  type="date"
                  value={editedHealth.nextVaccineDate.split('T')[0]}
                  onChange={(e) =>
                    setEditedHealth({
                      ...editedHealth,
                      nextVaccineDate: new Date(e.target.value).toISOString(),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Date de la visite vétérinaire
                </label>
                <input
                  type="date"
                  value={editedHealth.nextVetVisit.split('T')[0]}
                  onChange={(e) =>
                    setEditedHealth({
                      ...editedHealth,
                      nextVetVisit: new Date(e.target.value).toISOString(),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
