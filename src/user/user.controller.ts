import { userService } from "./user.Service";
import { Request,Response } from "express";
export class userController extends userService{
    constructor(){
        super();
    }

    public createNewUser = async(req:Request,res:Response):Promise<void>=>{
        const {userName,password} = req.body;
        try {
            const result = await this.createNewUser(userName,password);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({"msg":"Error while Creating User"});
        }
    }

}