import sharp from "sharp"
import { IFile } from "../data/post";

export async function resize(image: IFile): Promise<Buffer> {
    return await sharp(image.buffer).resize(800).toBuffer();
}