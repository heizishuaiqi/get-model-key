import { ReactNode } from 'react';

interface PillButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  newTab?: boolean;
  className?: string;
  variant?: 'ghost' | 'brand' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function PillButton({
  children,
  onClick,
  href,
  newTab = false,
  className = '',
  variant = 'ghost',
  size = 'md',
  disabled = false,
}: PillButtonProps) {
  const variantClasses = {
    ghost: 'btn-secondary-ghost',
    brand: 'btn-brand-gradient',
    neutral: 'rounded-full border border-white-06 bg-white-04 px-4 py-2 text-sm font-semibold text-text-secondary hover:bg-white-06 hover:border-white-08 transition-all duration-200',
  };

  const sizeClasses = {
    sm: 'px-4 py-1.5 text-xs min-h-8',
    md: 'px-5 py-2.5 text-sm min-h-10',
    lg: 'px-6 py-3 text-base min-h-12',
  };

  const baseClasses = `${variantClasses[variant]} ${sizeClasses[size]}`;
  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
