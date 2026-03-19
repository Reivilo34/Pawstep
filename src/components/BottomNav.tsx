import { Link, useLocation } from 'react-router-dom';
import { Home, Dog, UtensilsCrossed, Heart } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  { label: 'Accueil', path: '/app/accueil', icon: <Home size={24} /> },
  { label: 'Dressage', path: '/app/dressage', icon: <Dog size={24} /> },
  { label: 'Alimentation', path: '/app/alimentation', icon: <UtensilsCrossed size={24} /> },
  { label: 'Santé', path: '/app/sante', icon: <Heart size={24} /> },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-2xl mx-auto flex justify-around">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors ${
                isActive
                  ? 'text-emerald-600 bg-emerald-50'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
            >
              {item.icon}
              <span className="text-xs font-semibold mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
