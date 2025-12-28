import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-400 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-lg text-slate-400 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
