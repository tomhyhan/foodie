import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import { createRouter } from "next-connect";
const router = createRouter()
  
router.post( async (req, res) => {
  console.log("asdf")
  let data = await req.json()
  console.log(data);
  // return res.json({ hello: "world" });
  return NextResponse.json({data: 'Hello, Response from the server'});
})


export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };

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