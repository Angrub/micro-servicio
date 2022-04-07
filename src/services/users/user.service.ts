import { userModel } from "./user.model"
import { Model } from 'mongoose'
import { UserSchema } from "./user.interface";
import { createHashPassword } from "../../lib/passport";
import { CustomError } from "../../middlewares/error_handler/customError";

class UserService {
    model: Model<UserSchema>

    constructor() {
        this.model = userModel;
    }

    async createUser(username: string, password: string) {
        try {
            const user = {
                username,
                password: await createHashPassword(password)
            }
            const newUser = new this.model(user);
            const _user = await newUser.save();
            return _user;
        } catch(error: any) {
            throw new CustomError(error.message, 400);
        }
    }

    async findUser(username: string) {
        if(!username) throw new CustomError('username undefined', 400);
        const user = await this.model.findOne({
            username: username
        });
        return user;
    }

    async findUsers() {
        const users = await this.model.find();
        return users;
    }

    async findUserById(id: string) {
        const user = await this.model.findById(id);
        return user;
    }
}

export { UserService }