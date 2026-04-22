import type { Rental } from '../../types/rental';

interface RentalSearchProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
  onSearch: () => void;
  rentals: Rental[];
  loading: boolean;
  error: string | null;
}

const RentalSearch = ({
  phone,
  onPhoneChange,
  onSearch,
  rentals,
  loading,
  error,
}: RentalSearchProps) => {
  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';

    if (digits.length <= 2) formatted = digits;
    else if (digits.length <= 5) formatted = `${digits.slice(0, 2)} ${digits.slice(2)}`;
    else if (digits.length <= 8)
      formatted = `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
    else
      formatted = `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`;

    onPhoneChange(formatted ? `+${formatted}` : '');
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Twoje wypożyczenia</h2>
      <div className="flex gap-2">
        <input
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
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
          className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm"
        >
          {rental.firstName} {rental.lastName} — {rental.startDate} / {rental.endDate}
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
