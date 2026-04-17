import { Container } from "../layouts/Container";

export const Home = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to Car Rental</h1>
        <p className="text-lg text-gray-600">
          Your one-stop solution for renting cars
        </p>
      </div>
    </Container>
  );
};
