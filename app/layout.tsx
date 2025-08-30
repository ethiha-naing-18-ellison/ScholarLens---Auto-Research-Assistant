import './globals.css'

export const metadata = {
  title: 'ScholarLens - AI Research Assistant',
  description: 'AI-powered academic paper search and analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
