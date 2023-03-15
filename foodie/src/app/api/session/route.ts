import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next"

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        NextResponse.json(null)
    }

    return NextResponse.json(session)
}
