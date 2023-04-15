import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import { createRouter } from "next-connect";
import multer from "multer";
import { getImages, postImages } from '../../../lib/controllers/post.controller';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "../auth/[...nextauth]";
import {findUser} from "../../../lib/data/user.data"
import restricted from "../restricted";

const router = createRouter()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get(restricted, async(req, res) => {
  const page = req.query['page'] || 1
  try {
    await getImages(req.user, page)
    res.status(200).json({hello:"world1"})
  } catch (err) {
    console.error(`/api/image get result in ${err}`);
    res.status(500).json({error:"Fail to fetch posts"})
  }
})

router.post(upload.array('images'), async (req, res) => {
  // later on add get description, rating and location 

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(403).json("not authorized to access this content")
  }

  const user = await findUser(session.user.email)
  
  const images = req.files
  try {
    await postImages(images, user)
    res.status(200).json({data: 'Hello, Response from the server'});
  } catch(err) {
    res.status(500).json({error: err});
  }
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
//     return NextResponse.json({data: 'Hello, Response from the server'})
// }

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   }


