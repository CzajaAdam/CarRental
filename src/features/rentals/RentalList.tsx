import { useState } from 'react';
import type { Car } from '../../types/car';
import type { Rental } from '../../types/rental';
import { calculateCost } from './utils';

interface RentalListProps {
  cars: Car[];
  onRent: (car: Car, rental: Omit<Rental, 'id' | 'carId'>) => void;
}

const emptyForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
};

const RentalList = ({ cars, onRent }: RentalListProps) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);

  const availableCars = cars.filter((car) => car.rentalStatus === 'available');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleSubmit = () => {
    const PHONE_RE = /^\+\d{1,3} \d{3} \d{3} \d{3}$/;
    if (
      form.firstName === '' ||
      form.lastName === '' ||
      form.phone === '' ||
      form.email === '' ||
      form.startDate === '' ||
      form.endDate === ''
    ) {
      setFormError('Wypełnij wszystkie pola');
      return;
    }
    if (!PHONE_RE.test(form.phone)) {
      setFormError('Numer telefonu musi być w formacie +XX 000 000 000');
      return;
    }
    if (new Date(form.startDate) >= new Date(form.endDate)) {
      setFormError('Data zakończenia musi być późniejsza niż data rozpoczęcia');
      return;
    }
    if (selectedCar !== null) {
      onRent(selectedCar, form);
      setSelectedCar(null);
      setForm(emptyForm);
      setFormError(null);
    }
  };

  const handleClose = () => {
    setSelectedCar(null);
    setForm(emptyForm);
    setFormError(null);
  };

  const totalCost = selectedCar !== null ? calculateCost(selectedCar, form) : null;

  if (availableCars.length === 0) {
    return <p className="text-center text-gray-400 py-8">Brak dostępnych aut.</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {availableCars.map((car) => (
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
            <button
              onClick={() => setSelectedCar(car)}
              className="text-sm px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Wypożycz
            </button>
          </div>
        ))}
      </div>

      {selectedCar !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Wypożycz auto</h3>
                <p className="text-sm text-gray-400">
                  {selectedCar.make} {selectedCar.model} · {selectedCar.pricePerDay} zł/dzień
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Imię</label>
                <input
                  name="firstName"
                  placeholder="Jan"
                  value={form.firstName}
                  onChange={handleChange}
                  className={
                    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  }
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Nazwisko</label>
                <input
                  name="lastName"
                  placeholder="Kowalski"
                  value={form.lastName}
                  onChange={handleChange}
                  className={
                    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  }
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Telefon</label>
                <input
                  name="phone"
                  placeholder="+48 000 000 000"
                  value={form.phone}
                  onChange={handleChange}
                  className={
                    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  }
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="jan@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={
                    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  }
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Data rozpoczęcia</label>
                <input
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                  className={
                    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  }
                  disabled
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Data zakończenia</label>
                <input
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                  className={
                    'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                  }
                />
              </div>
            </div>

            {formError && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">
                {formError}
              </p>
            )}
            {totalCost && (
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 mb-3">
                Szacowany koszt: <span className="font-semibold text-gray-800">{totalCost} zł</span>
              </p>
            )}

            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSubmit}
                className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Potwierdź wypożyczenie
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RentalList;
