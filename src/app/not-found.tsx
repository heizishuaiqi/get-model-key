import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 text-h1 text-text-primary">404</div>
        <h1 className="mb-4 text-h2 text-text-primary">Page Not Found</h1>
        <p className="mb-8 max-w-md text-body text-text-secondary">
          The page you are looking for doesn&apos;t exist or has been moved. Try one of these links instead.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/" className="btn-primary-inverse">
            Back to Home
          </Link>
          <Link href="/providers/" className="btn-secondary-ghost">
            Browse Providers
          </Link>
          <Link href="/guides/" className="btn-secondary-ghost">
            Read Guides
          </Link>
        </div>
      </main>
    </div>
  );
}
