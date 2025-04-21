import { PROVIDERS } from "@app/shared/enums/provider.enum"

export class SIGNUPDTO {
    email: string
    name: string
    password: string
    avatar?: string
    provider: PROVIDERS
    providerId?: string
}