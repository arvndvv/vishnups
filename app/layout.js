import '@/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* You can add any global meta tags here */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{overflow:"hidden"}}>{children}</body>
    </html>
  );
}
