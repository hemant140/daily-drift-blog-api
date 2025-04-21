import { PROVIDERS } from "@app/shared/enums/provider.enum"
import { ApiProperty } from "@nestjs/swagger";

export class SIGNUPDTO {
    @ApiProperty({ example: 'john@example.com', description: 'User email address' })
    email: string;

    @ApiProperty({ example: 'JohnDoe123!', description: 'Password with a minimum of 8 characters' })
    password: string;

    @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
    name: string;

    avatar?: string
    provider: PROVIDERS
    providerId?: string
}