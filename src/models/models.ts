export default abstract class Models {
    private _db;
    private _table: string;

    constructor(table: string, db: any) {
        this._db = db;
        this._table = table;
    }

    public async getOne(values: []): Promise<any> {
        try {
            const getOne = await this._db.pool.query(
                `SELECT * FROM ${this._table} ;`
            );
            return getOne.rows;
        } catch (err) {
            return err;
        }
    }
}
