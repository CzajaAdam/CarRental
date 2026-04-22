import { useNavigate } from 'react-router-dom';

export const User = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-600 skew-y-3 -translate-y-32 z-0" />

      <div className="relative z-10 bg-white shadow-2xl shadow-slate-200 rounded-[2.5rem] p-10 md:p-14 max-w-lg w-full text-center border border-slate-100">
        <div className="mx-auto w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 border border-blue-100">
          <i className="fas fa-user-circle text-blue-600 text-4xl" />
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Panel Użytkownika</h1>

        <p className="text-slate-500 mt-4 leading-relaxed">
          Witaj z powrotem! Zarządzaj swoimi aktywnymi rezerwacjami lub wybierz nowy pojazd z naszej
          aktualnej floty.
        </p>

        <div className="mt-10 space-y-4">
          <button
            onClick={() => navigate('/rent')}
            className="group relative w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 ease-in-out cursor-pointer shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
          >
            <i className="fas fa-key text-blue-400 group-hover:text-white transition-colors" />
            <span>Wypożycz auto</span>
          </button>

          <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-50">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
              <i className="fas fa-shield-alt mr-1" /> Bezpieczeństwo
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
              <i className="fas fa-clock mr-1" /> Wsparcie 24/7
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
