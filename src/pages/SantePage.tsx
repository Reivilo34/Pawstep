import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePetData } from '../context/PetDataContext';
import { Calendar, Plus, Trash2, ExternalLink } from 'lucide-react';
import { HealthAppointment } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { formatDate, getDaysUntil } from '../utils/helpers';

const appointmentTypes: Array<'vaccin' | 'visite' | 'autre'> = ['vaccin', 'visite', 'autre'];

function generateGoogleCalendarUrl(appointment: HealthAppointment): string {
  const date = new Date(appointment.date);
  const startDate = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDate = new Date(date.getTime() + 60 * 60 * 1000)
    .toISOString()
    .replace(/[-:]/g, '')
    .split('.')[0] + 'Z';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: appointment.title,
    dates: `${startDate}/${endDate}`,
    details: `Rendez-vous pour votre animal - Mon Compagnon Loup`,
    location: '',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function SantePage() {
  const { currentPet } = useAuth();
  const { appointments, addAppointment, deleteAppointment } = usePetData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    type: 'autre' as 'vaccin' | 'visite' | 'autre',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.date && currentPet) {
      const appointment: HealthAppointment = {
        id: uuidv4(),
        petId: currentPet.id,
        title: formData.title,
        date: formData.date,
        time: formData.time,
        type: formData.type,
      };
      addAppointment(appointment);
      setFormData({ title: '', date: '', time: '', type: 'autre' });
      setShowAddForm(false);
    }
  };

  const petAppointments = appointments.filter(a => a.petId === currentPet?.id);
  const sortedAppointments = [...petAppointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcomingAppointments = sortedAppointments.filter(a => getDaysUntil(a.date) >= 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vaccin':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'visite':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-900 border-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'vaccin':
        return 'Vaccin';
      case 'visite':
        return 'Visite vétérinaire';
      default:
        return 'Autre';
    }
  };

  return (
    <div className="pb-28 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-900">Santé & Rendez-vous</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 mb-4">Aucun rendez-vous prévu</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Ajouter un rendez-vous
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => {
              const daysUntil = getDaysUntil(appointment.date);
              return (
                <div key={appointment.id} className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-emerald-900 mb-1">{appointment.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={16} className="text-gray-600" />
                        <span className="text-sm text-gray-600">{formatDate(appointment.date)}</span>
                        {appointment.time && <span className="text-sm text-gray-600">à {appointment.time}</span>}
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(appointment.type)}`}>
                        {getTypeLabel(appointment.type)}
                      </div>
                    </div>
                    <div className={`text-right ml-2 ${daysUntil <= 7 ? 'bg-red-100 text-red-900' : daysUntil <= 14 ? 'bg-orange-100 text-orange-900' : 'bg-emerald-100 text-emerald-900'} px-3 py-2 rounded-lg text-sm font-bold`}>
                      {daysUntil === 0 ? "Aujourd'hui" : `J-${daysUntil}`}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={generateGoogleCalendarUrl(appointment)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    >
                      <ExternalLink size={16} />
                      Ajouter à Google Agenda
                    </a>
                    <button
                      onClick={() => deleteAppointment(appointment.id)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">Ajouter un rendez-vous</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Titre</label>
                  <input
                    type="text"
                    placeholder="Ex: Vaccination annuelle"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                  >
                    {appointmentTypes.map(type => (
                      <option key={type} value={type}>
                        {getTypeLabel(type)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Heure (optionnel)</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg">
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
