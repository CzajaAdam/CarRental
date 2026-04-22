import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarManagement from '../features/cars/CarManagement';
import { Container } from '../layouts/Container';
import { useCars } from '../hooks/useCars';
import { useRentals } from '../hooks/useRentals';
import { checkAndUpdateOverdueStatus } from '../services/rentalService';

export const Admin = () => {
  const navigate = useNavigate();

  // it updates the car status
  const { cars, handleFetchCars, handleUpdateCar, loading: carsLoading } = useCars();
  const { rentals, handleFetchRentals, loading: rentalsLoading } = useRentals();

  useEffect(() => {
    handleFetchCars();
    handleFetchRentals();
  }, [handleFetchCars, handleFetchRentals]);

  useEffect(() => {
    if (!carsLoading && !rentalsLoading && cars.length > 0 && rentals.length > 0) {
      checkAndUpdateOverdueStatus(cars, rentals, handleUpdateCar);
    }
  }, [cars, rentals, carsLoading, rentalsLoading, handleUpdateCar]);

  return (
    <Container>
      <div className="py-10 space-y-10 antialiased">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.15em]">
              <i className="fas fa-shield-alt" />
              <span>System Zarządzania</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Panel administratora
            </h1>
            <p className="text-slate-500 font-medium">
              Pełna kontrola nad samochodami i aktywnymi procesami
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/rentals')}
            className="inline-flex cursor-pointer items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-slate-200"
          >
            <i className="fas fa-key text-blue-400" />
            <span>Lista wypożyczeń</span>
          </button>
        </header>

        <section className="group">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Zarządzanie samochodami
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50 transition-shadow duration-300 group-hover:shadow-slate-200/60">
            <div className="p-1 bg-slate-50/50 border-b border-slate-100">
              <div className="bg-white rounded-[1.25rem] p-6">
                {carsLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <i className="fas fa-circle-notch fa-spin text-3xl text-blue-600 mb-4" />
                    <p className="text-slate-500 font-medium tracking-tight">
                      Inicjalizacja floty...
                    </p>
                  </div>
                ) : (
                  <CarManagement />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};
