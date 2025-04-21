import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ROLE } from "../enums/role.enum";
import { PROVIDERS } from "../enums/provider.enum";

@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.userId = doc._id
            delete ret._id;
            delete ret.__v;
            delete ret.id;
            return ret;
        }

    }
})
export class User {

    @Prop({ required: true })
    name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: false, default: null })
    password: string

    @Prop({ required: true, enum: Object.values(ROLE), default: ROLE.ADMIN })
    role: string

    @Prop({ required: true, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s" })
    avatar: string

    @Prop({ enum: Object.values(PROVIDERS) })
    provider: string

}

export const userSchema = SchemaFactory.createForClass(User)