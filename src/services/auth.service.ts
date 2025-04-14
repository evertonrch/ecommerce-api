import { FirebaseError } from "firebase/app";
import EmailAlreadyExists from "../errors/email-already-exists.error";
import { User } from "../models/user.model";
import { getAuth, UpdateRequest, UserRecord } from "firebase-admin/auth"
import { getAuth as getFirebaseAuth, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential} from "firebase/auth"
import UnauthorizedError from "../errors/unauthorized.error";

export default class AuthService {
    
    async create(user: User): Promise<UserRecord> {
        return getAuth()
        .createUser({
            email: user.email,
            password: user.password,
            displayName: user.nome
        })
        .catch(err => {
            if(err.code === "auth/email-already-exists") {
                throw new EmailAlreadyExists("O e-mail informado já está em uso.")
            }
            throw err
        })
    }
    
    async update(id: string, user: User) {
        const props: UpdateRequest = {
            displayName: user.nome,
            email: user.email
        }
        
        if(user.password) {
            props.password = user.password
        }
        
        await getAuth().updateUser(id, props)
    }
    
    async login(email: string, senha: string): Promise<UserCredential | void> {
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, senha)
        .catch(err => {
            if(err instanceof FirebaseError && err.code === "auth/invalid-credential") {
                throw new UnauthorizedError()
            }
        })
    }

    async recovery(email: string) {
        await sendPasswordResetEmail(getFirebaseAuth(), email)
    }

    async delete(id: string): Promise<void> {
        await getAuth().deleteUser(id)
    }
}