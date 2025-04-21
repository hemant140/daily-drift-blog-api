import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { STATUS } from "../enums/status.enum";


@Schema({
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.blogPostId = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.id;
            return ret;
        }
    }
})
export class BlogPost {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: string

    @Prop({ type: String, required: true })
    tag: string;

    @Prop({ type: [String], required: true })
    topics: string[];

    @Prop({ type: String, default: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg" })
    image: string;

    @Prop({ enum: Object.values(STATUS), default: STATUS.ACTIVE })
    status: string

}

export const blogPostSchema = SchemaFactory.createForClass(BlogPost);