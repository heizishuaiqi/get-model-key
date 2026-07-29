import { ReactNode } from 'react';

interface PrimaryInverseButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  newTab?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function PrimaryInverseButton({
  children,
  onClick,
  href,
  newTab = false,
  className = '',
  type = 'button',
  disabled = false,
}: PrimaryInverseButtonProps) {
  const combinedClasses = [
    'btn-primary-inverse',
    disabled ? 'pointer-events-none opacity-60' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={combinedClasses}
        onClick={disabled ? undefined : onClick}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        aria-disabled={disabled || undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
