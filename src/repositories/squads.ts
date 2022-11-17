import connectDB from "../database/index";
import { IStatusResponse } from "../interface";

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

    async getSquad(squadName: String) {
        try {
            const getSquad = await this._db.pool.query(`SELECT * FROM squads WHERE name = $1`, [squadName]);

            console.log(getSquad.rows);

            const res: IStatusResponse<Array<{}>> = {
                status: 200,
                response: getSquad.rows,
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

    async postSquad(name: String, leader_id: String) {
        try {
            let queryText = "INSERT INTO squads (name,leader_id) VALUES ($1, $2) RETURNING *";
            let queryValue = [name, leader_id];

            const postSquad = await this._db.pool.query(queryText, queryValue);

            console.log(postSquad.rows);

            const res: IStatusResponse<Array<{}>> = {
                status: 200,
                response: postSquad.rows,
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
}
