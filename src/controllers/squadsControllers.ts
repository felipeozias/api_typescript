import {v4 as uuidv4} from "uuid";
import { Request, Response } from "express";
import SquadServices from "../services/squadsServices";
import User from "../model/user";
import Squad from "../model/squad";

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

    async update(req: Request, res: Response) {
        const squad = new Squad();
        squad.id = req.params["team_id"];
        squad.name = req.body["name"];
        squad.idLeader = req.body["leader"];

        const squadServices = new SquadServices();
        const result = await squadServices.update(squad);

        if (result.status > 300) {
            return res.status(result.status).json({ message: result.error });
        }
        res.status(200).json(result.data);
    }

    async removeMember(req: Request, res: Response) {
        const idTeam = req.params["team_id"];
        const idUser = req.params["user_id"];

        const squadServices = new SquadServices();
        const result = await squadServices.removeMember(idTeam, idUser);

        if (result.status > 300) {
            return res.status(result.status).json({ message: result.error });
        }
        const user = result.data as User;
        res.status(200).json({ message: `User ${user.username} removed from squad ${idTeam}` });
    }

    async addMember(req: Request, res: Response) {
        const idTeam = req.params["team_id"];
        const idUser = req.params["user_id"];

        const squadServices = new SquadServices();
        const result = await squadServices.addMember(idTeam, idUser);

        if (result.status > 300) {
            return res.status(result.status).json({ message: result.error });
        }
        const user = result.data as User;
        res.status(200).json({ message: `User ${user.username} added to squad ${idTeam}` });
    }
}

const squads = new squadControllers();
export { squads };
