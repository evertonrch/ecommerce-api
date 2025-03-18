import { Request, Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UserController {

    static async getAll(req: Request, res: Response): Promise<any> {
        const users = await new UserService().getAll()
        if(users.length === 0) {
            return res.status(204).end()
        }

        return res.status(200).send(users)
    }

    static async getById(req: Request, res: Response): Promise<any> {
        const id = req.params.id
        const user = await new UserService().getById(id)

        return res.status(200).send({id: user.id, ...user})
    }

    static async save(req: Request, res: Response): Promise<any> {
        await new UserService().save(req.body)
        return res.status(201).end()
    }

    static async update(req: Request, res: Response): Promise<any> {
        const id = req.params.id
        const user = req.body as User
        await new UserService().update(id, user)

        return res.status(204).end()
    }

    static async delete(req: Request, res: Response): Promise<any> {
        const id = req.params.id
        await new UserService().delete(id)

        return res.status(204).end()
    }
}