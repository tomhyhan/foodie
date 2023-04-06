import crypto from "crypto";

export async function generateImgName(): Promise<String>{
    return crypto.randomBytes(32).toString("hex");
}