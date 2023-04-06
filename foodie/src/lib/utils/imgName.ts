import crypto from "crypto";

export async function generateImgName(): Promise<string>{
    return crypto.randomBytes(32).toString("hex");
}