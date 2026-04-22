import { useEffect } from 'react';
import AdminRentalList from '../features/rentals/AdminRentalList';
import { useCars } from '../hooks/useCars';
import { useRentals } from '../hooks/useRentals';
import { Container } from '../layouts/Container';

export const AdminRentals = () => {
  const { rentals, handleFetchRentals } = useRentals();
  const { cars, handleFetchCars } = useCars();

  useEffect(() => {
    handleFetchCars();
  }, [handleFetchCars]);

  useEffect(() => {
    handleFetchRentals();
  }, [handleFetchRentals]);

  return (
    <Container>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Wypożyczenia</h2>
        <AdminRentalList cars={cars} rentals={rentals} />
      </div>
    </Container>
  );
};
