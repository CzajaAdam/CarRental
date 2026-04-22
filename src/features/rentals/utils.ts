import type { Car } from '../../types/car';
import type { Rental } from '../../types/rental';

export const calculateCost = (selectedCar: Car, form: Pick<Rental, 'startDate' | 'endDate'>) => {
  if (!form.startDate || !form.endDate) return null;
  const start = new Date(form.startDate);
  const end = new Date(form.endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return null;
  return days * selectedCar.pricePerDay;
};
