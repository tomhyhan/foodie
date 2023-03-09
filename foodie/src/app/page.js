import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Login from "./login"

export default async function Page({ Component, pageProps }) {
    const session = await getServerSession(authOptions)
    console.log(session);
    return <Login session={session}></Login>
}
