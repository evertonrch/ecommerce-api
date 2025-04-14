import { ErrorBase } from "./base.error";

export default class UnauthorizedError extends ErrorBase {
    constructor(message: string = "Não autorizado.") {
        super(401, message)
    }
}