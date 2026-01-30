interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'font-semibold transition-all duration-200 active:scale-95';
  
  const variants = {
    primary: 'h-12 rounded-xl bg-[var(--color-primary)] text-white px-6',
    secondary: 'h-12 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] px-6',
    icon: 'w-10 h-10 rounded-[10px] bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
