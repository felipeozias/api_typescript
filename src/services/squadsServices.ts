import { IStatusResponse } from "../interface";
import Squads from "../repositories/squads";
import Users from "../repositories/users";
import IResult from "../interface/iresult";
import UuidValidator from "../validators/uuid-validator";

export default class SquadServices {
    private _squad: Squads;
    constructor() {
        this._squad = new Squads();
    }

    async getAllSquads() {
        const getSquads: IStatusResponse<Array<{}> | any> | undefined = await this._squad.getAllSquads();
        return getSquads;
    }

    async getSquad(squadName: String) {
        const getSquad: IStatusResponse<Array<{}> | any> | undefined = await this._squad.getSquad(squadName);
        return getSquad;
    }

    async postSquad(param1: String, param2: String) {
        const postSquad: IStatusResponse<Array<{}> | any> | undefined = await this._squad.postSquad(param1, param2);
        return postSquad;
    }

    async removeMember(idTeam: String, idUser: String) {
        let result: IResult = { data: [], error: "", status: 200 };

        try {
            if (UuidValidator.validator(idTeam) !== null) {
                result.error = "Invalid team id";
                result.status = 400;
                return result;
            }
    
            if (UuidValidator.validator(idUser) !== null) {
                result.error = "Invalid user id";
                result.status = 400;
                return result;
            }
            const userRepository = new Users();
            result = await userRepository.removeSquad(idUser);
            
        } catch (error) {
            result.error = error as string;
            result.status = 500;            
        }
        return result;
    }
}
