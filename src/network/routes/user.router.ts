import { Router } from "express";
import { CustomError } from "../../middlewares/error_handler/customError";
import { response } from "../response";
import { UserService } from "../../services/users/user.service";

const router = Router();
const Controller = new UserService();

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await Controller.findUserById(id);
        response(res, user);
    } catch(error: any) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
        try {
            const users = await Controller.findUsers();
            response(res, users);
        } catch(error: any) {
            next(error);
        }
});

const userRouter = router;

export { userRouter }