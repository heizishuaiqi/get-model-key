import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

/**
 * 页面布局组件 - 统一所有页面的布局和样式
 * 确保英文和中文页面在架构和样式上完全一致
 */
export default function PageLayout({
  children,
  title,
  description,
  className = '',
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-bg-app text-text-primary ${className}`}>
      {/* Main content container with consistent padding */}
      <main className="container-custom py-8 md:py-12 lg:py-16">
        {/* Page header (optional) */}
        {(title || description) && (
          <div className="mb-12 text-center">
            {title && (
              <h1 className="text-h1 text-text-primary mb-4">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-body text-text-secondary max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Page content */}
        <div className="prose prose-invert max-w-none">
          {children}
        </div>
      </main>
    </div>
  );
}