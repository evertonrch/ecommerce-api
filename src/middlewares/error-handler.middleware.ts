import { NextFunction, Response, Request } from "express"
import { InternalServerError } from "../errors/internal-server.error"
import { ErrorBase } from "../errors/base.error"

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if(error instanceof ErrorBase) {
        return error.send(res)
    }
    new InternalServerError().send(res)     
}