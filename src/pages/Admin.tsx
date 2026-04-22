import { useNavigate } from 'react-router-dom';
import CarManagement from '../features/cars/CarManagement';
import { Container } from '../layouts/Container';

export const Admin = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="py-10 space-y-10 antialiased">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-[0.15em]">
              <i className="fas fa-shield-alt" />
              <span>System Zarządzania</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Panel administratora
            </h1>
            <p className="text-slate-500 font-medium">
              Pełna kontrola nad samochodami i aktywnymi procesami
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/rentals')}
            className="inline-flex cursor-pointer items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-slate-200"
          >
            <i className="fas fa-key text-blue-400" />
            <span>Lista wypożyczeń</span>
          </button>
        </header>

        <section className="group">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Zarządzanie samochodami
            </h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50 transition-shadow duration-300 group-hover:shadow-slate-200/60">
            <div className="p-1 bg-slate-50/50 border-b border-slate-100">
              <div className="bg-white rounded-[1.25rem] p-6">
                <CarManagement />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};
