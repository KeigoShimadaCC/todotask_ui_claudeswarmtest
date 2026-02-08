import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { Providers } from './providers/Providers';

export const metadata: Metadata = {
  title: 'Agent Activity Dashboard',
  description: 'Real-time monitoring dashboard for AI agents working on tasks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface min-h-screen">
        <Providers>
          <Header />
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
