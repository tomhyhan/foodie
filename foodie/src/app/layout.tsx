
import './globals.css'
import AuthContext from '@/components/authcontext'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children 
}: {children: React.ReactNode}) {
  return (
    <html lang="en">
        <body>
          <AuthContext >
            {children}
          </AuthContext>
        </body>
    </html>
  )
}

