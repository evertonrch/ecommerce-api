import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";
import { UserRepository, UserRespositoryImpl } from "../repositories/user.repository";
import AuthService from "./auth.service";

export class UserService {

    private userRepository: UserRepository
    private authService: AuthService

    constructor() {
        this.userRepository = new UserRespositoryImpl()
        this.authService = new AuthService()
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.getAll()
    }

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id)

        return {
            id: user.id,
            ...user.data() as User
        }
    }

    async save(user: User): Promise<void> {
        const userAuth = await this.authService.create(user)
        await this.userRepository.update(userAuth.uid,user)
    }

    async update(id: string, user: User): Promise<void> {
        const userSaved = await this.userRepository.getById(id)
        console.log(userSaved)
        if(!userSaved.exists) {
            throw new NotFoundError("Usuário não encontrado.")
        }

        await this.authService.update(id, user)
        await this.userRepository.update(id, user)
    }

    async delete(id: string): Promise<void> {
        const user = await this.userRepository.getById(id)
        if(!user.exists) {
            throw new NotFoundError("Usuário não encontrado.")
        }

        await this.authService.delete(id)
        await this.userRepository.delete(id)
    }
}