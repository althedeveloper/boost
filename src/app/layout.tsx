import './globals.css'

export const metadata = {
  title: 'Weather App',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="p-0 m-0 bg-darkBlue min-h-screen overflow-x-hidden w-full flex items-center" >{children}</body>
    </html>
  )
}
