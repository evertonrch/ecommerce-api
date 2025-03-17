import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found.error";

export const pageNotFoundHanlder = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError("Página não encontrada."))
}