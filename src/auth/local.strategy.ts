import { Strategy } from 'passport-local';
import { verifyPassword } from '../lib/passport';
import { CustomError } from '../middlewares/error_handler/customError';
import { UserService } from '../services/users/user.service'
const service = new UserService();

const localStrategy = new Strategy(async (username, password, done) => {
    try {
        const user = await service.findUser(username);
        if(!user) {
            done(new CustomError('Unauthorized', 401), false);
            return;
        }
        console.log(user, password)
        const isMatch = await verifyPassword(user.password, password);
        console.log(isMatch)
        if(!isMatch) {
            done(new CustomError('Unauthorized', 401), false);
        }
        done(null, user);

    } catch(error: any) {
        done(new CustomError(error.message), false);
    }
});

export { localStrategy }