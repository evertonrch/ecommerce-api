import { CollectionReference, DocumentSnapshot, getFirestore } from 'firebase-admin/firestore';
import { User } from './../models/user.model';

export interface UserRepository {
    getAll: () => Promise<User[]>
    getById: (id: string) => Promise<DocumentSnapshot>
    save: (user: User) => Promise<void>
    update: (id: string, user: User) => Promise<void>
    delete: (id: string) => Promise<void>
}

export class UserRespositoryImpl implements UserRepository {

    private collection: CollectionReference

    constructor() {
        this.collection = getFirestore().collection("users")
    }

    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get()

        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data() as User
            }
        })
    }

    async getById(id: string): Promise<DocumentSnapshot> {
        return await this.collection.doc(id).get()
    }

    async save(user: User): Promise<void> {
        await this.collection.add(user)
    }

    async update(id: string, user: User): Promise<void> {
        await this.getById(id)

        await this.collection.doc(id).set({
            nome: user.nome,
            email: user.email
        })
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete()
    }
}