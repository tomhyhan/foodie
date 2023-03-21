import { getServerSession, Session } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation';
import Signout from '../components/signout';

export default async function Page() {
    const session= await getServerSession(authOptions)

    if (session == null ) {
      redirect('/login')
    }

    return (<>
    <h1 className="text-2xl font-bold underline">
      Hello, Next.js! <br />
      Signed in as {session.user!.email} <br />
      <Signout></Signout>
  </h1>
    </>)
}


