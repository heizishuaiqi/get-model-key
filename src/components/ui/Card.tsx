import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'standard' | 'emphasis' | 'green' | 'offer' | 'featured';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  variant = 'standard',
  hover = false,
  padding = 'md',
}: CardProps) {
  const variantClasses = {
    standard: 'card-standard',
    emphasis: 'card-emphasis',
    green: 'card-green',
    offer: 'card-offer',
    featured: 'card-featured',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:border-white-08 hover:shadow-float' 
    : '';

  const combinedClasses = [
    variantClasses[variant],
    paddingClasses[padding],
    hoverClasses,
    className || null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
}