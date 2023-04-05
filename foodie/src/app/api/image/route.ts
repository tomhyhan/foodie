import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    api: {
      bodyParser: false,
    },
  };

export async function POST(request: NextRequest) {
    // @ts-ignore
    let data = await request.test
    console.log(data)
    return NextResponse.json({data: 'Hello, Response from the server'})
}

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   }