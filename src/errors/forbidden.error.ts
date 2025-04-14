import { ErrorBase } from "./base.error";

export default class ForbiddenError extends ErrorBase {
    constructor(message: string = "Path não acessível.") {
        super(403, message)
    }
}