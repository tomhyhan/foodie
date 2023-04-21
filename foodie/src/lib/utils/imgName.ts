import crypto from "crypto";

export async function generateImgName(): Promise<string>{
    return crypto.randomBytes(32).toString("hex");
}

export async function generatePostName(): Promise<string>{
    return crypto.randomBytes(6).toString("hex");
}