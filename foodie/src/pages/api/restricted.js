import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async (req, res, next) => {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    req.user = session.user.email
    next()
  } else {
    res.status(403).json({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}