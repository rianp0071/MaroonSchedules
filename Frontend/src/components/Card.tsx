interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-[var(--color-surface)] rounded-2xl p-4 ${className}`}
      style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}
    >
      {children}
    </div>
  );
}
