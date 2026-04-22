export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  licensePlate: string;
  rentalStatus: 'available' | 'rented' | 'overdue';
};
