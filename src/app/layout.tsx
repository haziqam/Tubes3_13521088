import './globals.css'

export const metadata = {
  title: 'Chat GPT DUPEEEE',
  description: 'chat bot created by anak k02',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
