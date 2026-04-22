import type { Car } from '../../types/car';
import type { Rental } from '../../types/rental';
import { getOverdueDays } from './utils';
import { useNavigate } from 'react-router-dom';

interface AdminRentalListProps {
  cars: Car[];
  rentals: Rental[];
}

const AdminRentalList = ({ cars, rentals }: AdminRentalListProps) => {
  const navigate = useNavigate();
  const rentedCars = cars.filter(
    (car) => car.rentalStatus === 'rented' || car.rentalStatus === 'overdue'
  );

  if (rentedCars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
        <i className="fas fa-car-slash text-slate-300 text-3xl mb-3" />
        <p className="text-slate-500 font-medium mb-6">Brak aktualnie wypożyczonych aut.</p>
        <button
          onClick={() => navigate('/admin')}
          className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 font-bold py-2 px-6 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
        >
          <i className="fas fa-arrow-left text-xs" />
          <span>Wróć</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-start">
        <button
          onClick={() => navigate('/admin')}
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-5 rounded-xl transition-all active:scale-95 text-sm"
        >
          <i className="fas fa-arrow-left" />
          <span>Wróć do panelu</span>
        </button>
      </div>

      <div className="grid gap-4">
        {rentedCars.map((car) => {
          const rental = rentals.find((rental) => rental.carId === car.id);
          const isOverdue = car.rentalStatus === 'overdue';
          const overdueDays = getOverdueDays(rental?.endDate);

          return (
            <div
              key={car.id}
              className={`group bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 ${
                isOverdue ? 'border-red-200 shadow-red-50' : 'border-slate-200 shadow-slate-100/50'
              }`}
            >
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className={`p-5 md:w-1/3 ${isOverdue ? 'bg-red-50/50' : 'bg-slate-50/50'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm text-white ${
                        isOverdue ? 'bg-red-600 animate-pulse' : 'bg-blue-600'
                      }`}
                    >
                      <i className={`fas ${isOverdue ? 'fa-exclamation-triangle' : 'fa-car'}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight">
                        {car.make} {car.model}
                      </h4>
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          isOverdue ? 'text-red-700 bg-red-100' : 'text-blue-600 bg-blue-50'
                        }`}
                      >
                        {car.licensePlate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 md:w-1/3 flex flex-col justify-center">
                  <div className="flex items-start gap-3">
                    <i
                      className={`fas fa-user mt-1 ${isOverdue ? 'text-red-400' : 'text-slate-400'}`}
                    />
                    <div>
                      <p className="font-bold text-slate-800 leading-none mb-1">
                        {rental?.firstName} {rental?.lastName}
                      </p>
                      <div className="text-sm text-slate-500 space-y-0.5">
                        <p className="flex items-center gap-2">
                          <i className="fas fa-phone text-[10px]" /> {rental?.phone}
                        </p>
                        <p className="flex items-center gap-2 text-xs">
                          <i className="fas fa-envelope text-[10px]" /> {rental?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-5 md:w-1/3 flex items-center justify-between ${
                    isOverdue ? 'bg-red-50/30' : 'bg-blue-50/30'
                  }`}
                >
                  <div className="space-y-1">
                    <div
                      className={`text-[10px] uppercase tracking-wider font-bold ${
                        isOverdue ? 'text-red-400' : 'text-slate-400'
                      }`}
                    >
                      {isOverdue ? 'Termin minął' : 'Okres wynajmu'}
                    </div>
                    <div className="text-sm font-medium">
                      <span className="text-slate-900 font-bold">{rental?.startDate}</span>
                      <i className="fas fa-arrow-right mx-2 text-slate-300 text-[10px]" />
                      <span
                        className={`${isOverdue ? 'text-red-600 font-black' : 'text-slate-900 font-bold'}`}
                      >
                        {rental?.endDate}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-[10px] uppercase tracking-wider font-bold ${
                        isOverdue ? 'text-red-400' : 'text-slate-400'
                      }`}
                    >
                      {isOverdue ? 'Dni zwłoki' : 'Czas'}
                    </div>
                    <div
                      className={`font-black text-lg leading-none ${
                        isOverdue ? 'text-red-600' : 'text-blue-700'
                      }`}
                    >
                      {isOverdue ? overdueDays : rental?.days}
                      <span className="text-xs ml-0.5">dni</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminRentalList;
