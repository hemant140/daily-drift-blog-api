
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SIGNUPDTO } from "./dto/signup.dto";
import { User } from "../../../libs/shared/src/schema/user.schema";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly usersModel: Model<User>
    ) { }


    async createUser(payload: SIGNUPDTO): Promise<User | null> {
        try {
            const response = await this.usersModel.create(payload);

            return response ? response as User : null

        } catch (error) {
            console.error('Something went wrong during signup', error.message)
            return null;

        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const response = await this.usersModel.findOne({ email });
            return response ? response as User : null
        } catch (error) {
            console.error(`Something went wrong at database end`, error.message);
            return null;
        }
    }

    async findById(userId: string): Promise<User | null> {
        try {
            const response = await this.usersModel.findById(userId);

            return response ? response as User : null;
        } catch (error) {
            console.error(`Something went wrong at database end`, error.message);
            return null;
        }
    }

}