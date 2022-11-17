import { IStatusResponse } from "../interface";
import IResult from "../interface/iresult";
import User from "../model/user";
import Users from "../repositories/users";
import crypto from "crypto";

export default class UserServices {
    private _user: Users;
    constructor() {
        this._user = new Users();
    }

    async getAllUsers() {
        const getUsers: IStatusResponse<Array<{}> | any> | undefined =
            await this._user.getAllUsers();
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
            if(user.password != null){
                user.password = crypto.createHash("sha256").update(user.password).digest("hex");
            }    
            result = await this._user.createUser(user);
        } catch (error) {
            result.error = error as string;
            result.status = 500;
        }
        return result;
    }

}
