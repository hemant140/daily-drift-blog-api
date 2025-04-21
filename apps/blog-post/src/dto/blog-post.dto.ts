import { STATUS } from "@app/shared/enums/status.enum";

export class BLOGPOSTDTO {
    title: string;
    description: string;
    author: string
    tags: string;
    topics: string[]
    views: number;
    images: string;
    status: STATUS
}