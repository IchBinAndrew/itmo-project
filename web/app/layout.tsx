import '@/app/globals.css';
// import type { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <AuthProvider>
          <Navbar />
          <main className="container min-w-full">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}