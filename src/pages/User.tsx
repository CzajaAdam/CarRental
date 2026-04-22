import { useNavigate } from 'react-router-dom';

export const User = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800">Strona użytkownika</h1>

        <p className="text-gray-500 mt-3">
          Tutaj możesz przeglądać i zarządzać swoimi wypożyczeniami.
        </p>

        <div className="mt-8">
          <button
            onClick={() => navigate('/rent')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 ease-in-out cursor-pointer shadow-md hover:shadow-lg"
          >
            Wypożycz auto
          </button>
        </div>
      </div>
    </div>
  );
};
