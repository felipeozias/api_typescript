import { Request, Response } from "express";
import SquadServices from "../services/squadsServices";

class squadControllers {
    constructor() {}

    async getAll(req: Request, res: Response) {
        const squadServices = new SquadServices();
        const squads: any = await squadServices.getAllSquads();

        if (squads.status > 300) {
            return res.status(squads.status).json({
                message: squads.response,
            });
        }

        res.status(200).json(squads.response);
    }
}

const squads = new squadControllers();
export { squads };
