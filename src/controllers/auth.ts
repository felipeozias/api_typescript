import { Request, Response } from "express";
import auth from "../auth/auth";
import { ILogin } from "../interface";

class AuthControllers {
    constructor() {}

    async login(req: Request, res: Response) {
        const data: ILogin = req.body;

        const user = await auth.createToken(data);

        if (user.status != 200) {
            return res.status(user.status).json({ message: user.response });
        }

        res.cookie("token", user.response, {
            maxAge: 900000,
            httpOnly: true,
        });

        res.status(200).json({
            token: user.response,
        });
    }
}

export default new AuthControllers();
