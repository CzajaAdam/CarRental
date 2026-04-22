import { FetchJSON } from './api';
import { API_URL } from '../data/constants';
import type { Car } from '../types/car';

export const fetchCars = async () => {
  return await FetchJSON(`${API_URL}/cars`);
};

export const addCar = async (car: Omit<Car, 'id'>) => {
  return await FetchJSON(`${API_URL}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
};

export const updateCar = async (car: Car) => {
  return await FetchJSON(`${API_URL}/cars/${car.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
};

export const deleteCar = async (id: string) => {
  return await FetchJSON(`${API_URL}/cars/${id}`, {
    method: 'DELETE',
  });
};
