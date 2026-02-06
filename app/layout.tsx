import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'TODO Tracker Dashboard',
  description: 'Track and manage technical debt through TODO comments',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface min-h-screen">
        <Header />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
