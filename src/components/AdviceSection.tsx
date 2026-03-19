import { Lightbulb, Heart, Apple, Brain } from 'lucide-react';
import { DogProfile } from '../types';

interface AdviceSectionProps {
  profile: DogProfile;
}

export default function AdviceSection({ profile }: AdviceSectionProps) {
  const getAdvice = (): Array<{ icon: JSX.Element; title: string; text: string }> => {
    const advice = [];
    const { weight } = profile;

    if (weight < 5) {
      advice.push({
        icon: <Heart className="text-emerald-600" size={24} />,
        title: 'Socialisation',
        text: 'Votre chiot a besoin de beaucoup de socialisation ! Exposez-le progressivement à différents environnements, personnes et autres animaux.',
      });
      advice.push({
        icon: <Apple className="text-emerald-600" size={24} />,
        title: 'Alimentation',
        text: 'Adaptez la quantité d\'alimentation à sa croissance rapide. Un chiot en pleine croissance a besoin de repas fréquents et nutritifs.',
      });
      advice.push({
        icon: <Brain className="text-emerald-600" size={24} />,
        title: 'Éducation',
        text: 'C\'est le moment idéal pour commencer l\'éducation de base. Les chiots apprennent très vite à cet âge !',
      });
    } else if (weight < 15) {
      advice.push({
        icon: <Heart className="text-emerald-600" size={24} />,
        title: 'Exercice physique',
        text: 'Augmentez progressivement les exercices physiques. Les promenades peuvent être plus longues maintenant.',
      });
      advice.push({
        icon: <Apple className="text-emerald-600" size={24} />,
        title: 'Alimentation équilibrée',
        text: 'Maintenez une alimentation équilibrée et adaptée à sa taille. Surveillez son poids pour éviter la surcharge.',
      });
      advice.push({
        icon: <Brain className="text-emerald-600" size={24} />,
        title: 'Formation avancée',
        text: 'Votre chien est prêt pour des exercices de dressage plus complexes. Renforcez les commandes de base.',
      });
    } else {
      advice.push({
        icon: <Heart className="text-emerald-600" size={24} />,
        title: 'Exercice régulier',
        text: 'Un exercice régulier est essentiel pour maintenir sa santé et son bien-être. Les chiens-loups ont besoin d\'activité physique quotidienne.',
      });
      advice.push({
        icon: <Apple className="text-emerald-600" size={24} />,
        title: 'Contrôle du poids',
        text: 'Surveillez son poids et ajustez les portions si nécessaire. Un poids stable est signe de bonne santé.',
      });
      advice.push({
        icon: <Brain className="text-emerald-600" size={24} />,
        title: 'Stimulation mentale',
        text: 'Les chiens-loups sont très intelligents et ont besoin de stimulation mentale régulière. Variez les exercices et jeux.',
      });
    }

    return advice;
  };

  const adviceList = getAdvice();

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-emerald-900 mb-4">Conseils Évolution</h2>

      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl shadow-lg p-6 border border-emerald-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white p-3 rounded-full shadow-md">
            <Lightbulb className="text-emerald-600" size={28} />
          </div>
          <h3 className="text-xl font-bold text-emerald-900">
            Conseils adaptés à {profile.name}
          </h3>
        </div>

        <div className="space-y-4">
          {adviceList.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-50 p-2 rounded-lg shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 mb-1">{item.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-white rounded-xl border-l-4 border-emerald-600">
          <p className="text-sm text-gray-700">
            <span className="font-bold text-emerald-900">Note :</span> Ces conseils sont
            généraux. Consultez toujours votre vétérinaire pour des recommandations
            spécifiques à votre compagnon.
          </p>
        </div>
      </div>
    </div>
  );
}
