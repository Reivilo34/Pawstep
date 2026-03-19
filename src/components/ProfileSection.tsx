import { useState } from 'react';
import { CreditCard as Edit2, Camera } from 'lucide-react';
import { DogProfile } from '../types';
import { calculateAge, formatDate } from '../utils/helpers';

interface ProfileSectionProps {
  profile: DogProfile;
  onUpdate: (profile: DogProfile) => void;
}

export default function ProfileSection({ profile, onUpdate }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = { ...profile, avatarUrl: reader.result as string };
        onUpdate(updatedProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdate(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl">🐺</span>
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors shadow-lg">
            <Camera size={16} />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        <h2 className="text-3xl font-bold text-emerald-900 mb-2">{profile.name}</h2>

        <div className="w-full space-y-2 text-center">
          <p className="text-gray-700">
            <span className="font-semibold">Race :</span> {profile.breed}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Poids actuel :</span> {profile.weight} kg
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Âge :</span> {calculateAge(profile.birthDate)}
          </p>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors shadow-md"
        >
          <Edit2 size={16} />
          MODIFIER
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">Modifier le profil</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Race</label>
                <input
                  type="text"
                  value={editedProfile.breed}
                  onChange={(e) => setEditedProfile({ ...editedProfile, breed: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Poids (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={editedProfile.weight}
                  onChange={(e) => setEditedProfile({ ...editedProfile, weight: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Date de naissance</label>
                <input
                  type="date"
                  value={editedProfile.birthDate.split('T')[0]}
                  onChange={(e) => setEditedProfile({ ...editedProfile, birthDate: new Date(e.target.value).toISOString() })}
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
