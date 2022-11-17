import { IStatusResponse } from "../interface";
import Squads from "../repositories/squads";
import Squad from "../model/squad";
import Users from "../repositories/users";
import IResult from "../interface/iresult";
import UuidValidator from "../validators/uuid-validator";
import StringValitador from "../validators/string-validator";

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

    async update(squad: Squad) {
        let result: IResult = { data: [], error: "", status: 200 };

        try {
            if (squad.validate() !== null) {
                result.error = squad.validate() as string;
                result.status = 400;
                return result;
            }
            result = await this._squad.update(squad);
        } catch (error) {
            result.error = error as string;
            result.status = 500;
        }
        return result;
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

    async addMember(idTeam: String, idUser: String) {
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
            result = await userRepository.addSquad(idUser, idTeam);
        } catch (error) {
            result.error = error as string;
            result.status = 500;
        }
        return result;
    }
}
