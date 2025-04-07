import './globals.css';
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Recipe Explorer',
  description: 'Find and view tasty recipes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-orange-200 shadow-md">
          <Link href="/" className="text-2xl font-bold">🍽️ Recipe Explorer</Link>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
