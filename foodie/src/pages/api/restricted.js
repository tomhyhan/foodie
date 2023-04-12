import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async (req, res, next) => {
  const session = await getServerSession(req, res, authOptions)
  console.log(session)
  if (session) {
    next()
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}