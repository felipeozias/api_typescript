import { Request, Response } from "express";
import User from "../model/user";
import UserServices from "../services/userServices";

class UserControllers {
    constructor() {}

    async getAll(req: Request, res: Response) {
        const userServices = new UserServices();
        const users: any = await userServices.getAllUsers();

        if (users.status > 300) {
            return res.status(users.status).json({
                message: users.response,
            });
        }

        res.status(200).json(users.response);
    }


    async createUser(req: Request, res: Response) {

        const userServices = new UserServices();

        const user = new User();
        
        user.username = req.body.username;
        user.email = req.body.email;
        user.firstName = req.body.first_name;
        user.lastName = req.body.last_name;
        user.password = req.body.password;
        user.type = req.body.is_admin;
      
        try{           
            const result = await userServices.insert(user);
        

            if (result.status > 300) {
                return res.status(result.status).json({
                    message: result.error,
                });
            }
            // return response
            return res.status(200).json({
                message: "usuario criado",
                user: result.data               
            });

        }catch(err){
            res.status(500).json({
                message: err
            })
        }


    }
    
}

const users = new UserControllers();
export { users };
