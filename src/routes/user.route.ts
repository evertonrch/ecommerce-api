import { Router, Request, Response, NextFunction } from "express"
import UUID from "node:crypto"

const userRoutes = Router()

type User = {
    id?: any
    nome: string
    idade: number
    email: string
}

const usuarios: User[] = []

userRoutes.get("/users", (req: Request, res: Response) => {
    if(usuarios.length === 0) {
        return res.status(204).send([])
    }
    return res.status(200).send(usuarios)
})

const isNotValid = (value: string): boolean => {
    return !value || value.trim().length === 0
}

const bodyHandle = (req: Request, res: Response, next: NextFunction) => {
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

    if(user.idade <= 0 || isNotValid(user.email) || isNotValid(user.nome)) {
        return res.status(400).send({
            message: "dados inválidos"
        })
    }
    next()
}

userRoutes.post("/users", bodyHandle, (req: Request, res: Response) => {
    usuarios.push({...req.body, id: UUID.randomUUID() })
    return res.status(201).send({
        message: "usuário criado"
    })
})

const userNotExists = (req: Request, res: Response, next: NextFunction) => {
    const user = usuarios.find(user => user.id === req.params.id)
    if(!user) {
        return res.status(404).send({
            message: "usuário não encontrado"
        })
    }
    next()
}

userRoutes.put("/users/:id", userNotExists, (req: Request, res: Response) => {
    const index = usuarios.findIndex(user => user.id === req.params.id)
    
    const user = usuarios[index]
    user.email = req.body.email
    user.idade = req.body.idade
    user.nome = req.body.nome

    return res.status(200).send({
        message: `usuário ${user.id} atualizado.`
    })
})

userRoutes.delete("/users/:id", (req: Request, res: Response) => {
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
})

export default userRoutes