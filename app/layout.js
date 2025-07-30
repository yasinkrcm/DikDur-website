import "./globals.css"

export const metadata = {
  title: 'DikDur - Duruş Analizi',
  description: 'Yapay zeka ile duruş analizi yapın',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        {/* WASM için gerekli headers */}
        <meta httpEquiv="Cross-Origin-Embedder-Policy" content="require-corp" />
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
      </head>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
