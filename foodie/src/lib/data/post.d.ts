export interface IFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}


export interface PostData {
    Desciption?: string;
    imageurls: string[];
    rate?: number;
    location?: string;
    user?: {
        connect: {
            id: string
        }
    }
}

export interface ImageData { 
    buffer: Buffer; 
    name: string; 
}