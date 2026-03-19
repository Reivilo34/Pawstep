import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        login(email, name);
      } else {
        login(email, name);
      }
      navigate('/app/accueil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream leaf-pattern flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-600 p-4 rounded-full text-5xl">
              🐺
            </div>
          </div>
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">Mon Compagnon Loup</h1>
          <p className="text-gray-600">Suivez et accompagnez votre fidèle ami</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isLogin ? 'Adresse email' : 'Adresse email'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Chargement...' : isLogin ? 'Se connecter' : 'Créer un compte'}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-sm">OU</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <button
            onClick={() => {
              login('google@example.com', 'Utilisateur Google');
              navigate('/app/accueil');
            }}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>🔵</span>
            Continuer avec Google
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Pas encore de compte ? " : "Déjà inscrit ? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail('');
                setName('');
              }}
              className="text-emerald-600 font-semibold hover:text-emerald-700"
            >
              {isLogin ? 'Créer un compte' : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
