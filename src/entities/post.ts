import { User } from "./user";

export class Post {
    uuid?: string;
    communicatorUserId?: string;
    communicatorUserName?: string;
    authorUserId?: string;
    authorUserName?: string;
    text?: string;
    img?: string;
    imgPath?: string;
    visibility?: boolean;
    timestamp?: number;
    user?: User;
}

