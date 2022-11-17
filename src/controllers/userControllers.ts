import { Request, Response } from "express";
import IResult from "../interface/iresult";
import UserServices from "../services/userServices";

class UserControllers {
    constructor() {}

    public async getAll(req: Request, res: Response) {
        const userServices = new UserServices();
        const users: any = await userServices.getAllUsers();

        if (users.status > 300) {
            return res.status(users.status).json({
                message: users.response,
            });
        }

        res.status(200).json(users.response);
    }

    public async getMe(req: Request, res: Response) {
        const userData = {
            id: req.body.id,
            category: req.body.userAdmin,
            name: req.body.userName,
            firstName: req.body.userFirstName,
            lastName: req.body.userLastName,
            email: req.body.userEmail,
            squad: req.body.squad,
        };

        res.status(200).json(userData);
    }

    public async getById(req: Request, res: Response) {
        const userId: string = req.params.user_id;

        const userServices = new UserServices();
        const user: IResult = await userServices.getUserById(userId);

        if (user.status > 300) {
            return res.status(user.status).json({
                message: user.data,
            });
        }

        res.status(200).json(user.data);
    }
}

const users = new UserControllers();
export { users };
