import { FetchJSON } from './api';
import { API_URL } from '../data/constants';
import type { Rental } from '../types/rental';

export const fetchRentals = async () => {
  return await FetchJSON(`${API_URL}/rentals`);
};

export const addRental = async (rental: Omit<Rental, 'id'>) => {
  return await FetchJSON(`${API_URL}/rentals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rental),
  });
};

export const updateRental = async (rental: Rental) => {
  return await FetchJSON(`${API_URL}/rentals/${rental.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rental),
  });
};

export const deleteRental = async (id: string) => {
  return await FetchJSON(`${API_URL}/rentals/${id}`, {
    method: 'DELETE',
  });
};

// phone numbers can be stored in various formats, so we normalize them by removing spaces before comparison
export const fetchRentalsByPhone = async (phone: string) => {
  const rentals = await FetchJSON(`${API_URL}/rentals`);
  const normalized = phone.replace(/\s/g, '');
  return rentals.filter((rental: Rental) => rental.phone.replace(/\s/g, '') === normalized);
};
