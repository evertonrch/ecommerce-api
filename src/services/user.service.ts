import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";
import { IUserRepository, UserRespositoryImpl } from "../repositories/user.repository";

export class UserService {

    private userRepository: IUserRepository

    constructor() {
        this.userRepository = new UserRespositoryImpl()
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.getAll()
    }

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id)
        if(!user.exists) {
            throw new NotFoundError("Usuário não encontrado.")
        }

        return {
            id: user.id,
            ...user.data() as User
        }
    }

    async save(user: User): Promise<void> {
        await this.userRepository.save(user)
    }

    async update(id: string, user: User): Promise<void> {
        await this.getById(id)
        await this.userRepository.update(id, user)
    }

    async delete(id: string): Promise<void> {
        await this.getById(id)
        await this.userRepository.delete(id)
    }
}