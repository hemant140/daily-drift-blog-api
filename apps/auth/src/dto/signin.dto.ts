import { ApiProperty } from "@nestjs/swagger";

export class SIGNINDTO {
    @ApiProperty({ example: 'john@example.com', description: 'Registered email address' })
    email: string;

    @ApiProperty({ example: 'JohnDoe123!', description: 'Password associated with the email' })
    password: string;
}