import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ILogin, IUserDataToken } from "../interface";
import Users from "../repositories/users";
import SquadServices from "../services/squadsServices";

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
            return { status: user.status, response: user.error };

        if (password != user.data.password) {
            return { status: 401, response: "Password invalid!" };
        }

        const userData: IUserDataToken = {
            userId: user.data.id,
            userEmail: user.data.email,
            userName: user.data.userName,
            userAdmin: user.data.type,
            userFirstName: user.data.firstName,
            userLastName: user.data.lastName,
            squadName: "Sem equipe",
        };

        if (!user.data.squadId == false) {
            userData.squadName = user.data.squad.name;
        }

        const _token = jwt.sign(userData, process.env.JWTSECRET || "", {
            expiresIn: 9999,
        });

        return { status: 200, response: _token };
    }

    public verifyAuth(req: any, res: Response, next: NextFunction) {
        const token: string = req.headers.authorization || "";

        jwt.verify(token, process.env.JWTSECRET || "", (err, decoded: any) => {
            if (err) return res.status(401).end();

            req.body.userId = decoded.userId;
            req.body.userAdmin = decoded.userAdmin;
            req.body.userName = decoded.userName;
            req.body.userFirstName = decoded.userFirstName;
            req.body.userLastName = decoded.userLastName;
            req.body.userEmail = decoded.userEmail;
            req.body.squad = decoded.squadName;

            next();
        });
    }

    public verifyAdminOrLead(req: any, res: Response, next: NextFunction) {
        if (req.body.userAdmin != "admin" && req.body.userAdmin != "lider") {
            return res.status(401).end();
        }

        next();
    }

    public verifyAdmin(req: any, res: Response, next: NextFunction) {
        if (req.body.userAdmin != "admin") {
            return res.status(401).end();
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
