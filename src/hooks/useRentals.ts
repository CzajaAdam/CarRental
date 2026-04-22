import { useState, useCallback } from 'react';
import {
  fetchRentals,
  addRental,
  updateRental,
  deleteRental,
  fetchRentalsByPhone,
} from '../services/rentalService';
import type { Rental } from '../types/rental';

export const useRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchRentals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedRentals = await fetchRentals();
      setRentals(fetchedRentals);
    } catch (err) {
      setError('Failed to fetch rentals');
      console.error('Error fetching rentals:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddRental = useCallback(async (rental: Omit<Rental, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const addedRental = await addRental(rental);
      setRentals((prev) => [...prev, addedRental]);
    } catch (err) {
      setError('Failed to add rental');
      console.error('Error adding rental:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateRental = useCallback(async (rental: Rental) => {
    setLoading(true);
    setError(null);
    try {
      const updatedRental = await updateRental(rental);
      setRentals((prev) =>
        prev.map((prevRental) => (prevRental.id === updatedRental.id ? updatedRental : prevRental))
      );
    } catch (err) {
      setError('Failed to update rental');
      console.error('Error updating rental:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteRental = useCallback(async (rental: Rental) => {
    setLoading(true);
    setError(null);
    try {
      await deleteRental(rental.id);
      setRentals((prev) => prev.filter((prevRental) => prevRental.id !== rental.id));
    } catch (err) {
      setError('Failed to delete rental');
      console.error('Error deleting rental:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFetchRentalsByPhone = useCallback(async (phone: string) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedRentals = await fetchRentalsByPhone(phone);
      setRentals(fetchedRentals);
    } catch (err) {
      setError('Failed to fetch rentals');
      console.error('Error fetching rentals:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    rentals,
    loading,
    error,
    handleFetchRentals,
    handleAddRental,
    handleUpdateRental,
    handleDeleteRental,
    handleFetchRentalsByPhone,
  };
};
