import { UserCredential } from 'firebase/auth';
import { Request, Response } from "express";
import AuthService from "../services/auth.service";

export default class AuthController {

    static async login(req: Request, res: Response) {
        const { email, password } = req.body

        const userCredential = await new AuthService().login(email, password) as UserCredential
        const token = await userCredential.user.getIdToken(true)

        res.status(200).json({ token })
    }

    static async recovery(req: Request, res: Response) {
        const { email } = req.body
        await new AuthService().recovery(email)
        res.end()
    }
}