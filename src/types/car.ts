export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  licensePlate: string;
  rentalStatus: 'available' | 'rented' | 'overdue';
};
