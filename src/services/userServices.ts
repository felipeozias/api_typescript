import { IStatusResponse } from "../interface";
import Users from "../repositories/users";

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
}
