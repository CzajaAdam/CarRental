import type { Car } from '../../types/car';
import type { Rental } from '../../types/rental';

interface AdminRentalListProps {
  cars: Car[];
  rentals: Rental[];
}

const AdminRentalList = ({ cars, rentals }: AdminRentalListProps) => {
  const rentedCars = cars.filter((car) => car.rentalStatus === 'rented');

  if (rentedCars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
        <i className="fas fa-car-slash text-slate-300 text-3xl mb-3" />
        <p className="text-slate-500 font-medium">Brak aktualnie wypożyczonych aut.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {rentedCars.map((car) => {
        const rental = rentals.find((rental) => rental.carId === car.id);

        return (
          <div
            key={car.id}
            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="p-5 md:w-1/3 bg-slate-50/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
                    <i className="fas fa-car" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">
                      {car.make} {car.model}
                    </h4>
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {car.licensePlate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 md:w-1/3 flex flex-col justify-center">
                <div className="flex items-start gap-3">
                  <i className="fas fa-user text-slate-400 mt-1" />
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

              <div className="p-5 md:w-1/3 bg-blue-50/30 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    Okres wynajmu
                  </div>
                  <div className="text-sm font-medium text-slate-700">
                    <span className="text-slate-900 font-bold">{rental?.startDate}</span>
                    <i className="fas fa-arrow-right mx-2 text-slate-300 text-[10px]" />
                    <span className="text-slate-900 font-bold">{rental?.endDate}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    Czas
                  </div>
                  <div className="text-blue-700 font-black text-lg leading-none">
                    {rental?.days}
                    <span className="text-xs ml-0.5">dni</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminRentalList;
