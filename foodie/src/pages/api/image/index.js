import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import { createRouter } from "next-connect";
import multer from "multer";
import { postImages } from '../../../lib/controllers.ts/post.controller';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "../auth/[...nextauth]";
import {findUser} from "../../../lib/data/user.data"

const router = createRouter()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post(upload.array('images'), async (req, res) => {
  // later on add get description, rating and location 

  const session = await getServerSession(req, res, authOptions)

// if not session ***

  const user = await findUser(session)

  const images = req.files
  await postImages(images)

  // return res.json({ hello: "world" });
  res.status(200).json({data: 'Hello, Response from the server'});
})


export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found!");
  },
})

export const config = {
    api: {
      bodyParser: false,
    },
};

// export async function POST(request: NextRequest) {
//     // @ts-ignore
//     let data = await request.json()
//     console.log(data)
//     return NextResponse.json({data: 'Hello, Response from the server'})
// }

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   }