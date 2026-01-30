import { Outlet, useLocation, useNavigate } from 'react-router';
import { Calendar, Search, Grid3x3, Bookmark, User } from 'lucide-react';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: '/dashboard', icon: Calendar, label: 'Schedule' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/builder', icon: Grid3x3, label: 'Builder' },
    { path: '/saved', icon: Bookmark, label: 'Saved' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-[390px] mx-auto bg-[var(--color-background)]">
      <main className="flex-1 overflow-y-auto pb-[72px]">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto h-[72px] bg-[var(--color-surface)] border-t border-[var(--color-border)] flex items-center justify-around px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-1 flex-1"
            >
              <Icon 
                size={24} 
                className={isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`caption ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
