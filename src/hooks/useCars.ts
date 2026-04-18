import { useState, useCallback } from 'react';
import { fetchCars, addCar, updateCar, deleteCar } from '../services/carService';
import type { Car } from '../types/car';

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchCars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedCars = await fetchCars();
      setCars(fetchedCars);
    } catch (err) {
      setError('Failed to fetch cars');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddCar = useCallback(async (car: Omit<Car, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const addedCar = await addCar(car);
      setCars((prev) => [...prev, addedCar]);
    } catch (err) {
      setError('Failed to add car');
      console.error('Error adding car:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateCar = useCallback(async (car: Car) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCar = await updateCar(car);
      setCars((prev) => prev.map((c) => (c.id === updatedCar.id ? updatedCar : c)));
    } catch (err) {
      setError('Failed to update car');
      console.error('Error updating car:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteCar = useCallback(async (car: Car) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCar(car.id);
      setCars((prev) => prev.filter((c) => c.id !== car.id));
    } catch (err) {
      setError('Failed to delete car');
      console.error('Error deleting car:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cars,
    loading,
    error,
    handleFetchCars,
    handleAddCar,
    handleUpdateCar,
    handleDeleteCar,
  };
};
