
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import React from 'react'
import Login from '../../components/login.component';
import { redirect } from 'next/navigation';


export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/")
  }

  return (
        <>
          Not signed in <br />
          <Login></Login>
        </>
      )
}
//  () => signIn()