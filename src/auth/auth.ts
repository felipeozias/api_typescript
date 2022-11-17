import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ILogin, IUserDataToken } from "../interface";
import Users from "../repositories/users";

export abstract class Auth {
    private _jwt;

    constructor() {
        this._jwt = jwt;
    }

    protected async createToken(data: ILogin) {
        const { email, password } = data;
        const userMod = new Users();
        const user = await userMod.getUserAuth(email);

        if (user.status > 300)
            return { status: user.status, response: user.response };

        if (password != user.response[0].password) {
            return { status: 401, response: "Password invalid!" };
        }

        const userData: IUserDataToken = {
            userId: user.response[0].id,
            userEmail: user.response[0].email,
            userName: user.response[0].name,
            userAdmin: user.response[0].is_admin,
            userFirstName: user.response[0].first_name,
            userLastName: user.response[0].last_name,
        };

        const _token = jwt.sign(userData, process.env.JWTSECRET || "", {
            expiresIn: 9999,
        });

        return { status: 200, response: _token };
    }

    public verifyAuth(req: any, res: Response, next: NextFunction) {
        const token: string = req.headers.authorization || "";

        jwt.verify(token, process.env.JWTSECRET || "", (err, decoded: any) => {
            if (err) return res.status(401).end();

            req.userId = decoded.userId;
            req.userAdmin = decoded.userAdmin;
            req.userName = decoded.userName;
            req.userFirstName = decoded.userFirstName;
            req.userLastName = decoded.userLastName;
            req.userEmail = decoded.userEmail;

            next();
        });
    }

    public verifyAdminOrLead(req: any, res: Response, next: NextFunction) {
        if (req.userAdmin != "admin" || req.userAdmin != "lead") {
            return res.status(401);
        }

        next();
    }

    public verifyAdmin(req: any, res: Response, next: NextFunction) {
        if (req.userAdmin != "admin") {
            return res.status(401);
        }

        next();
    }

    public verifyMe(req: any, res: Response, next: NextFunction) {
        const params = req.params.userId;

        if (req.userId != params) {
            return res.status(401);
        }

        next();
    }
}

//export default new Auth();
