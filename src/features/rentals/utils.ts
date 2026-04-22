import type { Car } from '../../types/car';
import type { Rental } from '../../types/rental';

export const calculateCost = (selectedCar: Car, form: Pick<Rental, 'startDate' | 'days'>) => {
  if (!form.startDate || !form.days) return null;
  const days = Number(form.days);
  if (isNaN(days) || days <= 0) return null;
  return days * selectedCar.pricePerDay;
};

export const getOverdueDays = (endDateStr: string | undefined) => {
  if (!endDateStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDateStr);
  end.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - end.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};
