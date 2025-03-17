import { NextFunction, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore"

type User = {
    id?: string
    nome: string
    idade: number
    email: string
}

const db = getFirestore().collection("users")

export class UserController {

    static async getAll(req: Request, res: Response) {
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

    static async getById(req: Request, res: Response) {
        const id = req.params.id
        const user = await db.doc(id).get()
        return res.status(200).send({id: user.id, ...user.data() as User})
    }

    static async save(req: Request, res: Response) {
        const user = req.body as User
        const saved = await db.add(user)

        return res.status(201).send({
            message: `usuário ${saved.id} salvo.`
        })
    }

    static async update(req: Request, res: Response) {
        const id = req.params.id
        const user = req.body as User

        await db.doc(id).set({
            nome: user.nome,
            email: user.email,
            idade: user.idade
        })

        return res.status(200).send({
            message: `usuário alterado com sucesso.`
        })    
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id
        await db.doc(id).delete()
        return res.status(204).end()
    }

    static async userNotExists(req: Request, res: Response, next: NextFunction) {
        const user = await db.doc(req.params.id).get()
        if(!user.exists) {
            return res.status(404).send({
                message: "usuário não encontrado"
            })
        }
        next()
    }

    static bodyValidator(req: Request, res: Response, next: NextFunction) {
        const user = req.body as User
            
        if(!user) {
            return res.status(400).send({
                message: "nenhum dado enviado."
            })
        }
        
        if (user?.id || user?.id?.length === 0) {
            return res.status(400).send({
                message: "ID não pode ser enviado."
            });
        }
        
        if(user.idade <= 0 || UserController.isNotValid(user.email) || UserController.isNotValid(user.nome)) {
            return res.status(400).send({
                message: "dados inválidos"
            })
        }
        next()
    }
    
    private static isNotValid(value: string): boolean {
        return !value || value.trim().length === 0
    }


}