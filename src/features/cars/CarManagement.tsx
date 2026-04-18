import { useEffect, useState } from 'react';
import { useCars } from '../../hooks/useCars';
import CarList from './CarList';
import type { Car } from '../../types/car';
import { MAX_CAR_YEAR, MIN_CAR_YEAR } from '../../data/constants';

type CarForm = Omit<Car, 'id' | 'year' | 'pricePerDay'> & {
  year: string;
  pricePerDay: string;
};

const emptyForm: CarForm = {
  make: '',
  model: '',
  year: MAX_CAR_YEAR.toString(),
  pricePerDay: '',
  licensePlate: '',
  rentalStatus: 'available',
};

const inputClass =
  'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition';

const CarManagement = () => {
  const { cars, loading, error, handleFetchCars, handleAddCar, handleUpdateCar, handleDeleteCar } =
    useCars();

  const [form, setForm] = useState<CarForm>(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  useEffect(() => {
    handleFetchCars();
  }, [handleFetchCars]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'year' && Number(value) > MAX_CAR_YEAR) {
      return;
    }

    if (name === 'pricePerDay' && value.includes('-')) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const parsed = {
      ...form,
      year: Number(form.year),
      pricePerDay: Number(form.pricePerDay),
    };

    if (parsed.year < MIN_CAR_YEAR || parsed.year > MAX_CAR_YEAR) {
      setFormError(`Rok musi być między ${MIN_CAR_YEAR} a ${MAX_CAR_YEAR}`);
      return;
    }
    if (parsed.pricePerDay < 0) {
      setFormError('Cena za dzień musi być większa lub równa 0');
      return;
    }

    setFormError(null);
    if (editingCar) {
      await handleUpdateCar({ ...parsed, id: editingCar.id });
      setEditingCar(null);
    } else {
      await handleAddCar(parsed);
    }
    setForm(emptyForm);
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setForm({
      ...car,
      year: car.year.toString(),
      pricePerDay: car.pricePerDay.toString(),
    });
  };

  const handleCancel = () => {
    setEditingCar(null);
    setForm(emptyForm);
    setFormError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-gray-800">Zarządzanie autami</h2>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-700">
          {editingCar ? 'Edytuj auto' : 'Dodaj nowe auto'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="make"
            placeholder="Marka"
            value={form.make}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            name="year"
            type="number"
            placeholder="Rok"
            value={form.year}
            onChange={handleChange}
            className={inputClass}
            min={MIN_CAR_YEAR}
            max={MAX_CAR_YEAR}
          />
          <input
            name="pricePerDay"
            type="number"
            placeholder="Cena za dzień (zł)"
            value={form.pricePerDay}
            onChange={handleChange}
            className={inputClass}
            min={0}
          />
          <input
            name="licensePlate"
            placeholder="Tablica rejestracyjna"
            value={form.licensePlate}
            onChange={handleChange}
            className={inputClass}
          />
          <select
            name="rentalStatus"
            value={form.rentalStatus}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="available">Dostępny</option>
            <option disabled value="rented">
              Wypożyczony
            </option>
            <option disabled value="overdue">
              Przeterminowany
            </option>
          </select>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {editingCar ? 'Zapisz zmiany' : 'Dodaj auto'}
          </button>
          {editingCar && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Anuluj
            </button>
          )}
        </div>
      </div>
      {formError && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {formError}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      {loading ? (
        <p className="text-center text-gray-400 py-8">Ładowanie...</p>
      ) : (
        <CarList cars={cars} onEdit={handleEdit} onDelete={handleDeleteCar} />
      )}
    </div>
  );
};

export default CarManagement;
