import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[42rem] px-6 pt-16">
      <h1 className="text-xl font-medium">Page Not Found</h1>
      <p className="mt-2 text-fg-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="link mt-6 inline-block py-1 text-sm">
        Return Home
      </Link>
    </main>
  );
}
