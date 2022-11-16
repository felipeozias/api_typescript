import connectDB from "../database/index";
import { IStatusResponse } from "../interface";

export default class Users {
    private _db: connectDB;
    constructor() {
        this._db = new connectDB();
    }

    async getAllUsers() {
        try {
            const getUsers = await this._db.pool.query(`SELECT * FROM users;`);

            const res: IStatusResponse<Array<{}>> = {
                status: 200,
                response: getUsers.rows,
            };
            return res;
        } catch (err) {
            const res: IStatusResponse<any> = { status: 500, response: err };
            return res;
        }
    }

    async getUserAuth(email: String) {
        try {
            const values = [email, false];
            const getUsers = await this._db.pool.query(
                `SELECT * FROM users WHERE email=$1 AND deleted=$2;`,
                values
            );

            if (getUsers.rows.length < 1)
                return { status: 400, response: "email not registered" };

            const res: IStatusResponse<Array<{}>> = {
                status: 200,
                response: getUsers.rows,
            };
            return res;
        } catch (err) {
            const res: IStatusResponse<any> = { status: 500, response: err };
            return res;
        }
    }
}
