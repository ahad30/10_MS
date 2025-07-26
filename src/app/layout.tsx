import { ReactNode } from 'react';
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body className="">
        {children}
      </body>
    </html>
  );
}

// ISR Configuration
export const revalidate = 86400; // Revalidate every 24 hours