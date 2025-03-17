import { NextFunction, Response, Request } from "express"
import { NotFoundError } from "../errors/not-found.error"
import { ValidationError } from "../errors/validation.error"
import { InternalServerError } from "../errors/internal-server.error"

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if(error instanceof NotFoundError) {
        return error.send(res)
    }
    if(error instanceof ValidationError) {
        return error.send(res)
    }
    new InternalServerError().send(res)     
}