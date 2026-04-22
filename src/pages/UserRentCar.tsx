import { useEffect } from 'react';
import { useCars } from '../hooks/useCars';
import RentalList from '../features/rentals/ClientRentalList';
import type { Car } from '../types/car';
import type { Rental } from '../types/rental';
import { useRentals } from '../hooks/useRentals';

export const RentCar = () => {
  const {
    cars,
    loading: carsLoading,
    error: carsError,
    handleFetchCars,
    handleUpdateCar,
  } = useCars();
  const { handleAddRental } = useRentals();

  useEffect(() => {
    handleFetchCars();
  }, [handleFetchCars]);

  const handleRent = async (car: Car, rentalData: Omit<Rental, 'id' | 'carId'>) => {
    await handleAddRental({ ...rentalData, carId: car.id });
    await handleUpdateCar({ ...car, rentalStatus: 'rented' });
  };

  const availableCars = cars.filter((car) => car.rentalStatus === 'available');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 antialiased">
      <section className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest">
              <i className="fas fa-car-side" />
              <span>Nasze auta</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Wybierz auto</h2>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-2xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-blue-800 font-bold text-sm">
              {availableCars.length} dostępnych pojazdów
            </span>
          </div>
        </header>

        {carsError && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
            <i className="fas fa-exclamation-circle" />
            <span className="font-medium">{carsError}</span>
          </div>
        )}

        <div className="min-h-75">
          {carsLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <i className="fas fa-circle-notch fa-spin fa-3x mb-4 text-blue-500" />
              <p className="font-medium uppercase tracking-tighter">Synchronizacja floty...</p>
            </div>
          ) : (
            <RentalList cars={cars} onRent={handleRent} />
          )}
        </div>
      </section>
    </div>
  );
};
