import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore"
import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";

const db = getFirestore().collection("users")

export class UserController {

    static async getAll(req: Request, res: Response): Promise<any> {
        const snapshot = await db.get()
        if(snapshot.size === 0) {
            return res.status(204).send([])
        }
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data() as User
            }
        })

        return res.status(200).send(users)
    }

    static async getById(req: Request, res: Response): Promise<any> {
        const id = req.params.id
        const user = await db.doc(id).get()
        if(!user.exists) {
            throw new NotFoundError("Usuário não encontrado.")
        }

        return res.status(200).send({id: user.id, ...user.data() as User})
    }

    static async save(req: Request, res: Response): Promise<any> {
        const user = req.body as User
        const saved = await db.add(user)

        return res.status(201).send({
            message: `usuário ${saved.id} salvo.`
        })
    }

    static async update(req: Request, res: Response): Promise<any> {
        const id = req.params.id
        const userRef = await db.doc(id).get()
        if(!userRef.exists) {
            throw new NotFoundError("Usuário não encontrado.")
        }

        const user = req.body as User

        await db.doc(id).set({
            nome: user.nome,
            email: user.email
        })

        return res.status(200).send({
            message: `usuário alterado com sucesso.`
        })    
    }

    static async delete(req: Request, res: Response): Promise<any> {
        const id = req.params.id
        const user = await db.doc(id).get()
        if(!user.exists) {
            throw new NotFoundError("Usuário não encontrado.")
        }
        await db.doc(id).delete()

        return res.status(204).end()
    }
}