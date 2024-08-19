'use client';

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="blue-dark">
      <body className="h-full w-full">{children}</body>
    </html>
  );
}
