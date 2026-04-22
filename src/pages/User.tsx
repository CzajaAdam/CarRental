import { useNavigate } from 'react-router-dom';
import RentalSearch from '../features/rentals/RentalSearch';
import { useRentals } from '../hooks/useRentals';
import { useState } from 'react';
import { useCars } from '../hooks/useCars';

export const User = () => {
  const navigate = useNavigate();

  const { cars, handleUpdateCar } = useCars();

  const {
    rentals,
    loading: rentalsLoading,
    error: rentalsError,
    handleFetchRentalsByPhone,
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
    if (phone.trim()) handleFetchRentalsByPhone(phone);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 bg-slate-50 px-6 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-blue-300/5 to-transparent pointer-events-none" />

      <div className="relative z-10 bg-white shadow-xl rounded-4xl p-10 md:p-14 max-w-lg w-full text-center border border-slate-200/60 backdrop-blur-sm">
        <div className="mx-auto w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 border border-blue-100 shadow-inner">
          <i className="fas fa-user-circle text-blue-600 text-5xl" />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Panel Użytkownika</h1>

        <p className="text-slate-500 mt-4 leading-relaxed">
          Witaj ponownie! Zarządzaj swoimi rezerwacjami lub wybierz nowy pojazd z naszej floty.
        </p>

        <div className="mt-10 space-y-4">
          <button
            onClick={() => navigate('/rent')}
            className="group relative w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
          >
            <i className="fas fa-key text-white/80 group-hover:text-white transition-colors" />
            <span>Wypożycz auto</span>
          </button>

          <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <i className="fas fa-shield-alt text-blue-500" /> Bezpieczeństwo
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <i className="fas fa-clock text-blue-500" /> Wsparcie 24/7
            </div>
          </div>
        </div>
      </div>

      <section className="relative z-10 bg-slate-900 rounded-4xl shadow-2xl overflow-hidden max-w-2xl w-full">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20" />

        <div className="relative z-10 p-10 md:p-14">
          <div className="flex items-center gap-3 text-blue-400 mb-4 font-bold uppercase tracking-widest text-xs">
            <i className="fas fa-user-circle" />
            <span>Strefa Klienta</span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-3">Zarządzaj rezerwacją</h3>

          <p className="text-slate-400 mb-8 leading-relaxed">
            Wpisz numer telefonu, aby sprawdzić status wynajmu lub zwrócić pojazd.
          </p>

          <div className="bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-lg">
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

        <div className="bg-white/5 border-t border-white/10 px-10 py-5 flex items-center gap-8">
          <div className="flex items-center gap-2 text-slate-300 text-xs uppercase tracking-widest font-semibold">
            <i className="fas fa-clock text-blue-400" />
            <span>Obsługa 24/7</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 text-xs uppercase tracking-widest font-semibold">
            <i className="fas fa-shield-alt text-blue-400" />
            <span>Bezpieczny zwrot</span>
          </div>
        </div>
      </section>
    </div>
  );
};
