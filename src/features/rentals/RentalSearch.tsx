import type { Rental } from '../../types/rental';
import ReturnRentalCarButton from './ReturnRentalCarButton';

interface RentalSearchProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
  onSearch: () => void;
  rentals: Rental[];
  loading: boolean;
  error: string | null;
  onReturn: (rentalId: string) => void;
}

const RentalSearch = ({
  phone,
  onPhoneChange,
  onSearch,
  rentals,
  loading,
  error,
  onReturn,
}: RentalSearchProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Twoje wypożyczenia</h2>
      <div className="flex gap-2">
        <input
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="+48 000 000 000"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1"
        />
        <button onClick={onSearch} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
          Szukaj
        </button>
      </div>

      {rentals.map((rental) => (
        <div
          key={rental.id}
          className="group bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold shrink-0">
                {rental.firstName[0].toUpperCase()}
                {rental.lastName[0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {rental.firstName} {rental.lastName}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">#{rental.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1.5 shrink-0">
                <span>{rental.startDate}</span>
                <span className="text-gray-300">
                  <i className="fas fa-arrow-right"></i>
                </span>
                <span>{rental.endDate}</span>
              </div>
              <ReturnRentalCarButton rentalId={rental.id} onReturn={onReturn} />
            </div>
          </div>
        </div>
      ))}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      {loading && <p className="text-center text-gray-400 py-8">Ładowanie...</p>}
    </div>
  );
};

export default RentalSearch;
