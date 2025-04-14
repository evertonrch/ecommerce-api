import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../errors/unauthorized.error";
import { getAuth } from "firebase-admin/auth";
import { UserService } from "../services/user.service";
import ForbiddenError from "../errors/forbidden.error";

enum Methods {
    POST = "POST"
}

enum Paths {
    LOGIN = "/auth/login",
    RECOVERY = "/auth/recovery"
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    if(req.method === Methods.POST && (req.path === Paths.LOGIN || req.path === Paths.RECOVERY)) {
        return next()
    }

    const token = req.headers.authorization?.split(" ")[1]
    if(token) {
        try {
            const decodedToken = await getAuth().verifyIdToken(token, true)

            const user = await new UserService().getById(decodedToken.uid)
            if(!user) {
                return next(new ForbiddenError())
            }

            req.user = user            
            return next()
        } catch(err) {
            return next(new UnauthorizedError())
        }
    }

    next(new UnauthorizedError())
}