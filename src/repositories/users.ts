import connectDB from "../database/index";
import { IStatusResponse } from "../interface";
import IResult from "../interface/iresult";
import User from "../model/user";

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

    async removeSquad(idUser: String) {
        const result: IResult = { data: [], error: "", status: 200 };
        const now = new Date();

        try {
            const query = "Update users set squad_id = null, updated_at = $2 where id = $1 RETURNING *";
            const values = [idUser, now];
            const data = await this._db.pool.query(query, values);
            if (data.rowCount > 0) {
                result.data = new User();
                result.data.id = data.rows[0].id;
                result.data.username = data.rows[0].username;
                result.data.email = data.rows[0].email;
                result.data.firstName = data.rows[0].first_name;
                result.data.lastName = data.rows[0].last_name;
                result.data.password = data.rows[0].password;
                result.data.type = data.rows[0].is_admin;
                result.data.squadId = data.rows[0].squad_id;
                result.data.createdAt = data.rows[0].created_at;
                result.data.updatedAt = data.rows[0].updated_at;
                result.data.deletedAt = data.rows[0].deleted_at;
            } else {
                result.error = "User not found";
                result.status = 404;
            }
            return result;
        } catch (err: any) {
            result.error = err.detail as string;
            result.status = 500;
            return result;
        }
    }

    async addSquad(idUser: String, idSquad: String) {
        const result: IResult = { data: [], error: "", status: 200 };
        const now = new Date();

        try {
            const query = "Update users set squad_id = $1, updated_at = $3 where id = $2 RETURNING *";
            const values = [idSquad, idUser, now];
            const data = await this._db.pool.query(query, values);
            if (data.rowCount > 0) {
                result.data = new User();
                result.data.id = data.rows[0].id;
                result.data.username = data.rows[0].username;
                result.data.email = data.rows[0].email;
                result.data.firstName = data.rows[0].first_name;
                result.data.lastName = data.rows[0].last_name;
                result.data.password = data.rows[0].password;
                result.data.type = data.rows[0].is_admin;
                result.data.squadId = data.rows[0].squad_id;
                result.data.createdAt = data.rows[0].created_at;
                result.data.updatedAt = data.rows[0].updated_at;
                result.data.deletedAt = data.rows[0].deleted_at;
            } else {
                result.error = "User not found";
                result.status = 404;
            }
            return result;
        } catch (err: any) {
            result.error = err.detail as string;
            result.status = 500;
            return result;
        }
    }


    async createUser(user:User) {
        const result: IResult = { data: [], error: "", status: 200 };

        try {
            const query = `INSERT INTO "users" (username, email, first_name, last_name, "password", is_admin) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

            const values = [ user.username, user.email, user.firstName, user.lastName, user.password, user.type ];
            const data = await this._db.pool.query(query, values);

            if (data.rowCount > 0) {
                result.data = new User();
                result.data.id = data.rows[0].id;
                result.data.username = data.rows[0].username;
                result.data.email = data.rows[0].email;
                result.data.firstName = data.rows[0].first_name;
                result.data.lastName = data.rows[0].last_name;
                result.data.password = data.rows[0].password;
                result.data.type = data.rows[0].is_admin;
                result.data.squadId = data.rows[0].squad_id;
                result.data.createdAt = data.rows[0].created_at;
                result.data.updatedAt = data.rows[0].updated_at;
                result.data.deletedAt = data.rows[0].deleted_at;
            } else {
                result.error = "User not found";
                result.status = 404;
            }
            return result;
        } catch (err: any) {
            result.error = err.detail as string;
            result.status = 500;
            return result;
        }
    }








}
