import '@/styles/globals.css?v=1';  // Force a refresh of styles with the version query

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head> */}
      <body style={{overflow:"hidden"}}>{children}</body>
    </html>
  );
}
