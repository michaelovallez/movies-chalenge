
import { Request } from 'express';
export interface requestWithUser extends Request {
    user: {
        email: string;
        role: string;
    }
}