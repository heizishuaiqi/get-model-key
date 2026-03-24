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
  const baseClasses = 'btn-primary-inverse';
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
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
