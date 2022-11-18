import { v4 as uuidv4 } from "uuid";
import connectDB from "../database/index";
import { IStatusResponse } from "../interface";
import IResult from "../interface/iresult";
import Squad from "../model/squad";

export default class Squads {
    private _db: connectDB;
    constructor() {
        this._db = new connectDB();
    }

    async getAllSquads() {
        try {
            const getSquads = await this._db.pool.query(`SELECT * FROM squads`);

            console.log(getSquads.rows);

            const res: IStatusResponse<Array<{}>> = {
                status: 200,
                response: getSquads.rows,
            };
            return res;
        } catch (err) {
            const res: IStatusResponse<any> = {
                status: 500,
                response: err,
            };
            return;
        }
    }

    async getSquad(idSquad: String) {
        const result: IResult = { data: [], error: "", status: 200 };

        try {
            const queryText = "SELECT * FROM squads WHERE id = $1 RETURNING *";
            const queryValue = [idSquad];
            const data = await this._db.pool.query(queryText, queryValue);
            if (data.rowCount > 0) {
                result.data = new Squad();
                result.data.id = data.rows[0].id;
                result.data.name = data.rows[0].name;
                result.data.idLeader = data.rows[0].leader_id;
                result.data.createdAt = data.rows[0].created_at;
                result.data.updatedAt = data.rows[0].updated_at;
            } else {
                result.error = "Squad not found";
                result.status = 404;
            }
            return result;
        } catch (err: any) {
            console.log(err);
            result.error = err.detail as string;
            result.status = 500;
            return result;
        }
    }

    async postSquad(squad: Squad) {
        const result: IResult = { data: [], error: "", status: 200 };

        try {
            const now = new Date();
            squad.id = uuidv4();
            const queryText =
                "INSERT INTO squads (id, name, leader_id, created_at) VALUES ($1, $2, $3, $4) RETURNING *";
            const queryValue = [squad.id, squad.name, squad.idLeader, now];
            const data = await this._db.pool.query(queryText, queryValue);
            if (data.rowCount > 0) {
                result.data = new Squad();
                result.data.id = data.rows[0].id;
                result.data.name = data.rows[0].name;
                result.data.idLeader = data.rows[0].leader_id;
                result.data.createdAt = data.rows[0].created_at;
                result.data.updatedAt = data.rows[0].updated_at;
            } else {
                result.error = "Squad not created";
                result.status = 404;
            }
            return result;
        } catch (err: any) {
            console.log(err);
            result.error = err.detail as string;
            result.status = 500;
            return result;
        }
    }

    async deleteSquad(idTeam: String) {
        const result: IResult = { data: [], error: "", status: 200 };

        try {
            const queryText = "DELETE FROM squads WHERE id = $1 RETURNING *";
            const queryValue = [idTeam];
            const data = await this._db.pool.query(queryText, queryValue);
            if (data.rowCount > 0) {
                result.data = new Squad();
                result.data.id = data.rows[0].id;
                result.data.name = data.rows[0].name;
                result.data.idLeader = data.rows[0].leader_id;
                result.data.createdAt = data.rows[0].created_at;
                result.data.updatedAt = data.rows[0].updated_at;
            } else {
                result.error = "Squad not found";
                result.status = 404;
            }
            return result;
        } catch (err: any) {
            console.log(err);
            result.error = err.detail as string;
            result.status = 500;
            return result;
        }
    }

    async update(squad: Squad) {
        const result: IResult = { data: [], error: "", status: 200 };

        try {
            const now = new Date();
            let query =
                "UPDATE squads SET name = $2, leader_id = $3, updated_at = $4 WHERE id = $1 RETURNING *";
            let values = [squad.id, squad.name, squad.idLeader, now];
            const data = await this._db.pool.query(query, values);
            if (data.rowCount > 0) {
                result.data = new Squad();
                result.data.id = data.rows[0].id;
                result.data.name = data.rows[0].name;
                result.data.idLeader = data.rows[0].leader_id;
                result.data.createdAt = data.rows[0].created_at;
                result.data.updatedAt = data.rows[0].updated_at;
            } else {
                result.error = "Squad not found";
                result.status = 404;
            }
            return result;
        } catch (err: any) {
            console.log(err);
            result.error = err.detail as string;
            result.status = 500;
            return result;
        }
    }
}
