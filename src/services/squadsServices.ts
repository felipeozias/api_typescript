import { IStatusResponse } from "../interface";
import Squads from "../repositories/squads";

export default class SquadServices {
    private _squad: Squads;
    constructor() {
        this._squad = new Squads();
    }

    async getAllSquads() {
        const getSquads: IStatusResponse<Array<{}> | any> | undefined =
            await this._squad.getAllSquads();
        return getSquads;
    }

    async getSquad(squadName: String) {
        const getSquad: IStatusResponse<Array<{}> | any> | undefined =
            await this._squad.getSquad(squadName);
        return getSquad;
    }

    async postSquad(param1: String, param2: String) {
        const postSquad: IStatusResponse<Array<{}> | any> | undefined =
            await this._squad.postSquad(param1, param2);
        return postSquad;
    }
}
