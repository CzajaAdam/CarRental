interface ReturnRentalCarButtonProps {
  rentalId: string;
  onReturn: (rentalId: string) => void;
}

const ReturnRentalCarButton = ({ rentalId, onReturn }: ReturnRentalCarButtonProps) => (
  <button
    onClick={() => onReturn(rentalId)}
    className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors font-medium"
  >
    Zwróć auto
  </button>
);

export default ReturnRentalCarButton;
