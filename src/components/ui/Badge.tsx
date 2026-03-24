import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'brand' | 'neutral' | 'success' | 'warning' | 'info' | 'danger';
  size?: 'sm' | 'md';
}

export default function Badge({
  children,
  className = '',
  variant = 'brand',
  size = 'md',
}: BadgeProps) {
  const variantClasses = {
    brand: 'tag-brand',
    neutral: 'tag-neutral',
    success: 'rounded-full border border-brand-300/20 bg-brand-12 px-3 py-1 text-xs font-semibold text-brand-300',
    warning: 'rounded-full border border-warning-500/20 bg-warning-500/10 px-3 py-1 text-xs font-semibold text-warning-500',
    info: 'rounded-full border border-info-500/20 bg-info-500/10 px-3 py-1 text-xs font-semibold text-info-500',
    danger: 'rounded-full border border-danger-500/20 bg-danger-500/10 px-3 py-1 text-xs font-semibold text-danger-500',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  };

  const baseClasses = `${variantClasses[variant]} ${sizeClasses[size]}`;
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <span className={combinedClasses}>
      {children}
    </span>
  );
}