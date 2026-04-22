import type { Car } from '../../types/car';
import type { Rental } from '../../types/rental';

export const calculateCost = (selectedCar: Car, form: Pick<Rental, 'startDate' | 'days'>) => {
  if (!form.startDate || !form.days) return null;
  const days = Number(form.days);
  if (isNaN(days) || days <= 0) return null;
  return days * selectedCar.pricePerDay;
};
