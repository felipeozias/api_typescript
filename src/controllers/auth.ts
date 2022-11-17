import { Request, Response } from "express";
import { Auth } from "../auth";
import { ILogin } from "../interface";

class AuthControllers extends Auth {
    constructor() {
        super();
    }

    async login(req: Request, res: Response) {
        const data: ILogin = req.body;

        const user = await super.createToken(data);

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
