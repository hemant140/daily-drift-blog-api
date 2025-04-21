import { STATUS } from "@app/shared/enums/status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class BLOGPOSTDTO {
    @ApiProperty({
        description: 'Title of the blog post',
        example: 'Exploring the Future of Remote Work: Tools and Culture',
    })
    title: string;

    @ApiProperty({
        description: 'Description of the blog post',
        example: 'This is a sample blog content showing how to create a detail page in Angular. You can dynamically show content using data passed via route parameters.',
    })
    description: string;

    author: string;

    @ApiProperty({
        description: 'Comma-separated tags for the blog post',
        example: 'Technology',
    })
    tag: string;

    @ApiProperty({
        description: 'Topics related to the blog post',
        example: [
            "Remote Tools",
            "Team Collaboration"
        ],
        type: [String],
    })
    topics: string[];

    @ApiProperty({
        description: 'Image URL or path for the blog post',
        example: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg",
    })
    images: string;

    status: STATUS;
}