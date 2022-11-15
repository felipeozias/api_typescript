import { Pool } from "pg";
import { database } from "../configs";

export default class connectDB {
    private _pool: Pool;
    constructor() {
        this._pool = new Pool(database);
    }

    get pool() {
        return this._pool;
    }
}
