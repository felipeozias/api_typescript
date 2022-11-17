import {v4 as uuidv4} from "uuid";
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

    async getSquad(req: Request, res: Response) {
        const squadServices = new SquadServices();
        const squads: any = await squadServices.getSquad(req.params["team"]);
        
        if (req.params["team"].length < 36 ) {
            res.status(400).send(`[ERROR]: Id inválido`);

        } else if (squads == undefined) {
            res.status(400).send(`[ERROR]: Id não encontrado`);
            
        } else {
            if (squads.status > 300) {
                return res.status(squads.status).json({
                    message: squads.response,
                });
            }
            
            res.status(200).json(squads.response);
        }
    }

    async postSquad(req: Request, res: Response) {
        const squadServices = new SquadServices();
        

        if (req.body["name"].length == 0) {
            res.status(400).send(`[ERROR]: Parametro name vazio`);

        } else if (req.body["leader_id"].length == 0) {
            res.status(400).send(`[ERROR]: Parametro leader id vazio`);

        } else {
            const squads: any = await squadServices.postSquad(req.body["name"], req.body["leader_id"]);

            if (squads == undefined) {
                res.status(400).send(`[ERROR]: Leader id não encontrado ou Nome da squad repetido!`);
            } else {
                if (squads.status > 300) {
                    return res.status(squads.status).json({
                        message: squads.response,
                    });
                }
                
                res.status(200).json(squads.response);
            }

        }
        
    }
}

const squads = new squadControllers();
export { squads };
