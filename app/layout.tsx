// layout.tsx (Server Component)
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import LoadingComponent from './LoadingComponent'; // Import the Client Component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Telegram Mini App',
  description: 'A simple Telegram mini app using Next.js and Prisma',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingComponent /> {/* Add the client-side component here */}
        {children}
      </body>
    </html>
  );
}
