export interface IFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}


export interface PostData {
    Desciption?: String;
    imageurls: String[];
    rate?: number;
    location?: String;
}