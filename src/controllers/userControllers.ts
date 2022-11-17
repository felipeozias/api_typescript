import { Request, Response } from "express";
import UserServices from "../services/userServices";

class UserControllers {
    constructor() {}

    async getAll(req: Request, res: Response) {
        const userServices = new UserServices();
        const users: any = await userServices.getAllUsers();

        if (users.status > 300) {
            return res.status(users.status).json({
                message: users.response,
            });
        }

        res.status(200).json(users.response);
    }
    
}

const users = new UserControllers();
export { users };
