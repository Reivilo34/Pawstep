import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import AppLayout from './pages/AppLayout';
import AccueilPage from './pages/AccueilPage';
import DressagePage from './pages/DressagePage';
import AlimentationPage from './pages/AlimentationPage';
import SantePage from './pages/SantePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const { user, currentPet, pets, loadPetData } = useAuth() as any;

  useEffect(() => {
    if (currentPet && currentPet.id) {
      // Load pet data from context or localStorage
    }
  }, [currentPet]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/app/*"
        element={
          user ? (
            <AppLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="accueil" element={<AccueilPage />} />
        <Route path="dressage" element={<DressagePage />} />
        <Route path="alimentation" element={<AlimentationPage />} />
        <Route path="sante" element={<SantePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="/" element={<Navigate to={user ? '/app/accueil' : '/login'} replace />} />
    </Routes>
  );
}

export default App;
