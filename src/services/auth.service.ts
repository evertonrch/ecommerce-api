import EmailAlreadyExists from "../errors/email-already-exists.error";
import { User } from "../models/user.model";
import { getAuth, UserRecord } from "firebase-admin/auth"

export default class AuthService {

    create(user: User): Promise<UserRecord> {
        return getAuth()
            .createUser({
                email: user.email,
                password: user.senha,
                displayName: user.nome
            })
            .catch(err => {
                if(err.code === "auth/email-already-exists") {
                    throw new EmailAlreadyExists("O e-mail informado já está em uso.")
                }
                throw err
            })
    }
}