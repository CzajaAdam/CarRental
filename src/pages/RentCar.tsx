import { useEffect, useState } from 'react';
import { useCars } from '../hooks/useCars';
import { useRentals } from '../hooks/useRentals';
import RentalList from '../features/rentals/RentalList';
import type { Car } from '../types/car';
import type { Rental } from '../types/rental';
import RentalSearch from '../features/rentals/RentalSearch';

export const RentCar = () => {
  const {
    cars,
    loading: carsLoading,
    error: carsError,
    handleFetchCars,
    handleUpdateCar,
  } = useCars();
  const {
    rentals,
    loading: rentalsLoading,
    error: rentalsError,
    handleFetchRentalsByPhone,
    handleAddRental,
    handleDeleteRental,
  } = useRentals();
  const [phone, setPhone] = useState('');

  const handleReturnCar = async (rentalId: string) => {
    const rental = rentals.find((r) => r.id === rentalId);
    const car = cars.find((c) => c.id === rental?.carId);
    if (!rental || !car) return;

    await handleUpdateCar({ ...car, rentalStatus: 'available' });
    await handleDeleteRental(rental);
  };

  const handleSearch = () => {
    console.log(phone);
    if (phone.trim()) handleFetchRentalsByPhone(phone);
  };

  useEffect(() => {
    handleFetchCars();
  }, [handleFetchCars]);

  const handleRent = async (car: Car, rentalData: Omit<Rental, 'id' | 'carId'>) => {
    await handleAddRental({ ...rentalData, carId: car.id });
    await handleUpdateCar({ ...car, rentalStatus: 'rented' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-gray-800">Dostępne auta</h2>
      {carsError && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {carsError}
        </p>
      )}
      {carsLoading ? (
        <p className="text-center text-gray-400 py-8">Ładowanie...</p>
      ) : (
        <RentalList cars={cars} onRent={handleRent} />
      )}
      <RentalSearch
        phone={phone}
        onPhoneChange={setPhone}
        onSearch={handleSearch}
        rentals={rentals}
        loading={rentalsLoading}
        error={rentalsError}
        onReturn={handleReturnCar}
      />
    </div>
  );
};
