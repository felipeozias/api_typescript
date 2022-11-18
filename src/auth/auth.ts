import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ILogin, IUserDataToken } from "../interface";
import Users from "../repositories/users";
import crypto from "crypto";
import Squads from "../repositories/squads";

export abstract class Auth {
    private _jwt;

    constructor() {
        this._jwt = jwt;
    }

    protected async createToken(data: ILogin) {
        const { email, password } = data;
        const userMod = new Users();
        const user = await userMod.getUserAuth(email);

        const passwordHash = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        if (user.status > 300)
            return { status: user.status, response: user.error };

        if (passwordHash != user.data.password) {
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
            squadId: user.data.squadId,
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
            req.body.squadId = decoded.squadId;

            next();
        });
    }

    public async verifyAdminOrLead(
        req: any,
        res: Response,
        next: NextFunction
    ) {
        const squad = new Squads();
        const userSquad = await squad.getSquad(req.body.squadId);

        if (req.body.userAdmin != "admin" && req.body.userAdmin != "lider") {
            return res.status(401).end();
        }

        if (
            req.body.userAdmin == "lider" &&
            userSquad.data.idLeader != req.body.userId
        ) {
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
        const params = req.params.user_id;

        if (req.body.userId != params) {
            return res.status(401);
        }

        next();
    }
}
