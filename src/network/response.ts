import { Response } from 'express'

function response(res: Response, data: any, status?: number) {
    res.status(status || 200).json({data});
}

export { response }