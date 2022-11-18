import { Request, Response } from "express";
import IResult from "../interface/iresult";
import User from "../model/user";
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

    async createUser(req: Request, res: Response) {
        const userServices = new UserServices();

        const user = new User();

        user.username = req.body.username;
        user.email = req.body.email;
        user.firstName = req.body.first_name;
        user.lastName = req.body.last_name;
        user.password = req.body.password;
        user.type = "funcionario";

        try {
            const result = await userServices.insert(user);

            if (result.status > 300) {
                return res.status(result.status).json({
                    message: result.error,
                });
            }

            return res.status(200).json({
                message: "usuario criado",
                user: result.data,
            });
        } catch (err) {
            res.status(500).json({
                message: err,
            });
        }
    }

    async updateUser(req: Request, res: Response) {
        const userServices = new UserServices();

        const user = new User();
        user.id = req.params.user_id;
        user.username = req.body.username;
        user.email = req.body.email;
        user.firstName = req.body.first_name;
        user.lastName = req.body.last_name;
        user.password = req.body.password;

        const result = await userServices.update(user);

        if (result.status > 300) {
            return res.status(result.status).json({ message: result.error });
        }
        res.status(200).json(result.data);
    }

    async deleteUser(req: Request, res: Response) {
        const userServices = new UserServices();

        const user = new User();
        user.id = req.params.user_id;

        const result = await userServices.delete(user.id);

        if (result.status > 300) {
            return res.status(result.status).json({ message: result.error });
        }

        res.status(200).json(result.data);
    }
}

const users = new UserControllers();
export { users };
