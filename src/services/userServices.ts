import { IStatusResponse } from "../interface";
import IResult from "../interface/iresult";
import Users from "../repositories/users";
import SquadServices from "./squadsServices";
import User from "../model/user";
import crypto from "crypto";

export default class UserServices {
    private _user: Users;
    private _squadService: SquadServices;
    constructor() {
        this._user = new Users();
        this._squadService = new SquadServices();
    }

    async getAllUsers() {
        const getUsers: IStatusResponse<Array<{}> | any> | undefined =
            await this._user.getAllUsers();
        return getUsers;
    }

    async getUserById(userId: String): Promise<IResult> {
        const getUsers: IResult = await this._user.getUserById(userId);

        if (getUsers.status > 300) return getUsers;

        if (!getUsers.data.squadId) {
            getUsers.data.squad = {
                squad: "Sem equipe",
            };

            return getUsers;
        }

        const squad = await this._squadService.getSquad(getUsers.data.squadId);

        getUsers.data.squad = {
            squad: squad?.response,
        };

        return getUsers;
    }

    async insert(user: User) {
        let result: IResult = { data: [], error: "", status: 200 };

        try {
            if (user.validate() !== null) {
                result.error = user.validate() as string;
                result.status = 400;
                return result;
            }
            if (user.password != null) {
                user.password = crypto
                    .createHash("sha256")
                    .update(user.password)
                    .digest("hex");
            }
            result = await this._user.createUser(user);
        } catch (error) {
            result.error = error as string;
            result.status = 500;
        }
        return result;
    }
}
