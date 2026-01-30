interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`h-7 rounded-full px-3 caption whitespace-nowrap transition-all ${
        selected
          ? 'bg-[var(--color-primary)] text-white'
          : 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
      }`}
    >
      {label}
    </button>
  );
}
