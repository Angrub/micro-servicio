import { Router } from "express";
import passport from "passport";
import axios from "axios";
import { config } from "../../config";
import { CustomError } from "../../middlewares/error_handler/customError";

const router = Router();

router.get('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res, next) => {
        try {
            if(req.user) {
                // @ts-ignore
                const { sub } = req.user;
                const { data } = await axios.get(`${config.mc.uri}/debts/${sub}?limit=${req.query.limit}`);
                res.json(data);
            }
        } catch(error: any) {
            next(error);
        }
});

router.post('/', async (req, res, next) => {
    try {
        const { data } = await axios.post(`${config.mc.uri}/debts/`, req.body);
        res.json(data);
    } catch(error: any) {
        next(error);
    }
});

const debtRouter = router;
export { debtRouter }