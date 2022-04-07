import { Router } from "express";
import { response } from "../response";
import { UserService } from "../../services/users/user.service";
import { signToken } from "../../lib/jwt-token";
import passport from "passport";
import { config } from "../../config";

const router = Router();
const Controller = new UserService();

router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await Controller.createUser(username, password);
        const payload = {
            sub: user.id
        }
        const token = signToken(payload, config.api.jwtSecret)
        const data = {
            user: user.username,
            token
        }
        response(res, data, 201);
    } catch(error: any) {
        next(error);
    }
});

router.post('/login', 
    passport.authenticate('local', {session: false}), 
    async (req, res, next) => {
        try {
            const { user }: any = req;
            if(user) {
                const payload = {
                    sub: user.id
                }
                const token = signToken(payload, config.api.jwtSecret);
                const data = {
                    user: user.username,
                    token
                }
                response(res, data);  
            } 
        } catch(error: any) {
            next(error);
        }
});

const authRouter = router;

export { authRouter }