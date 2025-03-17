import { ErrorBase } from "./base.error";

export class InternalServerError extends ErrorBase {

    constructor(message = "Error interno. Contato o administrador do sistema.") {
        super(500, message)
    }
}