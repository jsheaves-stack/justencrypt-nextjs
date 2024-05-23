'use client'

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full w-full">
        {children}
      </body>
    </html>
  );
}
