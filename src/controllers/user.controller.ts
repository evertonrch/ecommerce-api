import { NextFunction, Request, Response } from "express";
import UUID from "node:crypto"

type User = {
    id?: any
    nome: string
    idade: number
    email: string
}

const usuarios: User[] = []

export class UserController {

    static getAll(req: Request, res: Response) {
        if(usuarios.length === 0) {
            return res.status(204).send([])
        }
        return res.status(200).send(usuarios)
    }

    static save(req: Request, res: Response) {
        usuarios.push({...req.body, id: UUID.randomUUID() })
        return res.status(201).send({
            message: "usuário criado"
        })
    }

    static update(req: Request, res: Response) {
        const index = usuarios.findIndex(user => user.id === req.params.id)
            
        const user = usuarios[index]
        user.email = req.body.email
        user.idade = req.body.idade
        user.nome = req.body.nome
        
        return res.status(200).send({
            message: `usuário ${user.id} atualizado.`
        })
    }

    static delete(req: Request, res: Response) {
        const id = req.params.id
        const index = usuarios.findIndex(user => user.id === id)
        if(index === -1) {
            return res.status(404).send({
                message: `usuário não encontrado.`
            })
        }

        const usuarioRemovido = usuarios[index]
        usuarios.splice(index, 1)
        return res.status(200).send({
            message: `usuario ${usuarioRemovido.id} removido.`
        })
    }

    static userNotExists(req: Request, res: Response, next: NextFunction) {
        const user = usuarios.find(user => user.id === req.params.id)
        if(!user) {
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