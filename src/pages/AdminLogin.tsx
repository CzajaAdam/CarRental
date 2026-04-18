import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../layouts/Container';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (
      username === import.meta.env.VITE_ADMIN_USERNAME &&
      password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin');
    } else {
      setError('Nieprawidłowa nazwa użytkownika lub hasło');
    }
  };

  return (
    <Container className="flex justify-center items-center">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-sm shadow-sm">
        <div className="mb-8">
          <div className="w-10 h-10 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center mb-6">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gray-400"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <p className="text-xl font-semibold text-gray-800 mb-1">Panel administratora</p>
          <p className="text-sm text-gray-400">Zaloguj się, aby kontynuować</p>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Nazwa użytkownika</label>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Hasło</label>
            <input
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          Zaloguj się
        </button>

        <p className="text-center text-xs text-gray-300 mt-5">Dostęp tylko dla administratorów</p>
      </div>
    </Container>
  );
};
