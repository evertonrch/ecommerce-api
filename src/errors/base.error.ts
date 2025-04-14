import { Response } from "express";

export class ErrorBase extends Error {

    constructor(private status: number, message: string) {
        super(message)        
    }

    send(res: Response) {
        const message = {
            message: this.message,
            statusCode: this.status,
            timestamp: new Date().toISOString()
        }
        return res.status(this.status).json(message)
    }
}