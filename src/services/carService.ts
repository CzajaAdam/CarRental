import { FetchJSON } from './api';
import { url } from '../data/constants';
import type { Car } from '../types/car';

export const fetchCars = async () => {
  return await FetchJSON(`${url}/cars`);
};

export const addCar = async (car: Omit<Car, 'id'>) => {
  return await FetchJSON(`${url}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
};

export const updateCar = async (car: Car) => {
  return await FetchJSON(`${url}/cars/${car.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
};

export const deleteCar = async (id: number) => {
  return await FetchJSON(`${url}/cars/${id}`, {
    method: 'DELETE',
  });
};
