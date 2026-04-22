import { useEffect, useState } from 'react';
import { useCars } from '../hooks/useCars';
import { useRentals } from '../hooks/useRentals';
import RentalList from '../features/rentals/ClientRentalList';
import RentalSearch from '../features/rentals/RentalSearch';
import type { Car } from '../types/car';
import type { Rental } from '../types/rental';

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

  useEffect(() => {
    handleFetchCars();
  }, [handleFetchCars]);

  const handleRent = async (car: Car, rentalData: Omit<Rental, 'id' | 'carId'>) => {
    await handleAddRental({ ...rentalData, carId: car.id });
    await handleUpdateCar({ ...car, rentalStatus: 'rented' });
  };

  const handleReturnCar = async (rentalId: string) => {
    const rental = rentals.find((r) => r.id === rentalId);
    const car = cars.find((c) => c.id === rental?.carId);
    if (!rental || !car) return;

    await handleUpdateCar({ ...car, rentalStatus: 'available' });
    await handleDeleteRental(rental);
  };

  const handleSearch = () => {
    if (phone.trim()) handleFetchRentalsByPhone(phone);
  };

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
              {cars.length} dostępnych pojazdów
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

      <section className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20" />

        <div className="relative z-10 p-8 md:p-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-blue-400 mb-4 font-bold uppercase tracking-widest text-xs">
              <i className="fas fa-user-circle" />
              <span>Strefa Klienta</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Zarządzaj rezerwacją</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Wpisz swój numer telefonu, aby sprawdzić status wynajmu lub dokonać szybkiego zwrotu
              pojazdu.
            </p>

            <div className="bg-white/5 backdrop-blur-md p-1 rounded-2xl border border-white/10">
              <div className="bg-white rounded-xl p-6">
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
            </div>
          </div>
        </div>

        <div className="bg-white/5 border-t border-white/5 px-8 md:px-12 py-4 flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-semibold">
            <i className="fas fa-clock text-blue-500" />
            <span>Obsługa 24/7</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-semibold">
            <i className="fas fa-shield-alt text-blue-500" />
            <span>Bezpieczny zwrot</span>
          </div>
        </div>
      </section>
    </div>
  );
};
