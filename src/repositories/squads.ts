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
}
