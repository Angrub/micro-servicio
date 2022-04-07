import { NextFunction, Response, Request } from "express";
import { CustomError } from "./customError";

function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    if(!err.status) {
        res.status(500).json({
            error: 'Internal server error'
        });

    } else {
        res.status(err.status).json({
            error: err.message,
            stack: err.stack
        });
    }
}

export { errorHandler }