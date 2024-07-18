import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={'relative container mt-8 mb-8 mx-auto p-8 ${roboto.className}'}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-black opacity-90 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Nothing here</h2>
            <p className="text-lg mb-4">Could not find the page.</p>
            <Link href="/">
            <h1 className="text-blue-100 hover:text-blue-700 transition-colors duration-300">Return Home</h1>
            </Link>
        </div>
      </div>
    </div>
  );
}
