import { Application, Router } from "express";
import { authRouter } from "./routes/auth.router";
import { debtRouter } from "./routes/debts.router";
import { userRouter } from "./routes/user.router";

function router(app: Application) {
    const router = Router();

    router.use('/auth', authRouter);
    router.use('/users', userRouter);
    router.use('/debts', debtRouter)

    app.use('/api/v1', router);
}

export { router }