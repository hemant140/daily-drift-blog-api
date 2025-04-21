import * as joi from 'joi';

export class SchemaValidation {

    static signupSchema = joi.object({
        name: joi.string().min(2).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().alphanum().min(4).max(100).required()
    });

    static signinSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().alphanum().min(4).max(100).required()
    });

    static blogPostSchema = joi.object({
        title: joi.string().min(3).max(200).required(),
        description: joi.string().min(10).required(),
        tag: joi.string().required(),
        topics: joi.array().items(joi.string()).min(1).required(),
        image: joi.string().required(),
    });

    static updateBlogPostSchema = joi.object({
        title: joi.string().min(3).max(200),
        description: joi.string().min(10),
        tag: joi.string(),
        topics: joi.array().items(joi.string()).min(1),
        image: joi.string(),
    });


}