import { userService } from "./user.Service";
import { NextFunction, Request,Response } from "express";
import {Middleware} from '../middleware/middleware'
import { User } from "../interface/user";
import { Session } from "express-session";
export class userController extends userService{
    private middleWare:Middleware;
    constructor(){
        super();
        this.middleWare = new Middleware();
    }

    public createNewUser = async(req:Request,res:Response):Promise<void>=>{
        const {userName,userPassword} = req.body;
        
        try {
            const result = await this.createUser(userName,userPassword);
            if(typeof(result) === 'string'){
                res.status(400).json({"msg":result})
            }else{
                res.status(201).json({msg:"User Created"});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({"msg":"Error while Creating User"});
        }
    }

    public findExistingUser = async(req:Request,res:Response):Promise<void>=>{
        const {userName} = req.query;
        console.log(req.query)
        try{
            const result = await this.findUser(userName as string);
            result ? res.status(200).json(result):res.status(404).json({"msg":"could not find user"});
        }catch(error){
            console.error(error);
            res.status(500).json({"msg":"Error while finding User"});
        }
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
          const { userName, userPassword } = req.body;
          const loginUser = await this.loginUser(userName, userPassword) as unknown as User | boolean;

          if (loginUser !== false) {
              (req.session as any).user  = { userId: (loginUser as User).user_id, uuId: (loginUser as User).uuId,isLoggin:true };
              (req.session as Session).save();
              console.log(req.session);
            res.status(200).json({ "msg": "Login successful" });
          } else {
            res.status(401).json({ "msg": "Invalid credentials" });
          }

        } catch (error) {
          console.error(error);
          res.status(500).json({ "msg": "Error while finding User" });
        }
      }


      public updateUserInfo = async(req:Request,res:Response): Promise<void>=>{
         const user_uuId = (req.session as any).user.uuId;
         const {updateField,newValue} = req.body;
        
         try {
            const updateUser = await this.updateUser(user_uuId,updateField,newValue);
            console.log(updateUser);
            if(updateUser === 1){
                (req.session as any).destroy();
                res.status(200).json({"msg":"success please log in again"});
            }else{
                res.status(400).json(updateUser);
            }
         } catch (error) {
            console.error(error);
            res.status(500).json({"msg":"Error while updating information"});
         }
      }
}