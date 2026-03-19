import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, ArrowLeft } from 'lucide-react';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="pb-28 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-emerald-600 mb-6 hover:text-emerald-700">
          <ArrowLeft size={20} />
          Retour
        </button>

        <h1 className="text-3xl font-bold text-emerald-900 mb-6">Paramètres</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-emerald-900 mb-4">Profil utilisateur</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Nom</p>
              <p className="text-lg font-semibold text-emerald-900">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold text-emerald-900">{user?.email}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-md"
        >
          <LogOut size={20} />
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
