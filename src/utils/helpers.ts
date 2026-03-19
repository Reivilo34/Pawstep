export const calculateAge = (birthDate: string): string => {
  const birth = new Date(birthDate);
  const now = new Date();

  const diffTime = Math.abs(now.getTime() - birth.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} mois`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    if (remainingMonths === 0) {
      return `${years} an${years > 1 ? 's' : ''}`;
    }
    return `${years} an${years > 1 ? 's' : ''} et ${remainingMonths} mois`;
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getDaysUntil = (dateString: string): number => {
  const target = new Date(dateString);
  const now = new Date();
  target.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isToday = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const shouldResetTraining = (lastReset: string): boolean => {
  const lastResetDate = new Date(lastReset);
  const today = new Date();
  return lastResetDate.toDateString() !== today.toDateString();
};
