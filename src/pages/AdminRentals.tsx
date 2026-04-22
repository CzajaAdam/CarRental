import { useEffect } from 'react';
import AdminRentalList from '../features/rentals/AdminRentalList';
import { useCars } from '../hooks/useCars';
import { useRentals } from '../hooks/useRentals';
import { Container } from '../layouts/Container';
import { useNavigate } from 'react-router';

export const AdminRentals = () => {
  const { rentals, handleFetchRentals } = useRentals();
  const { cars, handleFetchCars } = useCars();

  useEffect(() => {
    handleFetchCars();
  }, [handleFetchCars]);

  useEffect(() => {
    handleFetchRentals();
  }, [handleFetchRentals]);

  const navigate = useNavigate();

  return (
    <Container>
      <button
        onClick={() => navigate('/admin')}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Wróć
      </button>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Wypożyczenia</h2>
        <AdminRentalList cars={cars} rentals={rentals} />
      </div>
    </Container>
  );
};
