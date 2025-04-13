import { ErrorBase } from "./base.error";

export default class EmailAlreadyExists extends ErrorBase {
    constructor(message: string) {
        super(409, message)
    }
}