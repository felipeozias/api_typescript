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
}
