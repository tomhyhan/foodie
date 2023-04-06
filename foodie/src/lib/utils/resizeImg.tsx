import sharp from "sharp"
import { IFile } from "../data/post.data";

export async function resize(image: IFile): Promise<Buffer> {
    return await sharp(image.buffer).resize(800).toBuffer();
}