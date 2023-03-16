import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Login from "./login"

export default async function Page() {
    // let x = await getData();
    
    return (<>
    <h1 className="text-2xl font-bold underline">
      Hello, Next.js!
    </h1>
    <Login ></Login></>)
}



// async function getData() {
//   const res = await fetch("http://localhost:3000/apitest/hello")
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }
//   console.log(res.json());
//   return res.json()
// }
