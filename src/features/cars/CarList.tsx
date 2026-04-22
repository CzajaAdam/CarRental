import type { Car } from '../../types/car';

interface CarListProps {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (car: Car) => void;
}

const statusLabel: Record<Car['rentalStatus'], string> = {
  available: 'Dostępny',
  rented: 'Wypożyczony',
  overdue: 'Po terminie',
};

const statusClass: Record<Car['rentalStatus'], string> = {
  available: 'bg-green-100 text-green-700',
  rented: 'bg-red-100 text-red-700',
  overdue: 'bg-orange-100 text-orange-700',
};

const CarList = ({ cars, onEdit, onDelete }: CarListProps) => {
  if (cars.length === 0) {
    return <p className="text-center text-gray-400 py-8">Brak aut w bazie.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {cars.map((car) => {
        const isDisabled = car.rentalStatus === 'rented' || car.rentalStatus === 'overdue';

        return (
          <div
            key={car.id}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm"
          >
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-800">
                {car.make} {car.model}
              </span>
              <span className="text-sm text-gray-400">
                {car.year} · {car.licensePlate} · {car.pricePerDay} zł/dzień
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${statusClass[car.rentalStatus]}`}
              >
                {statusLabel[car.rentalStatus]}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(car)}
                  disabled={isDisabled}
                  className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Edytuj
                </button>
                <button
                  onClick={() => onDelete(car)}
                  disabled={isDisabled}
                  className="text-sm px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Usuń
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarList;
