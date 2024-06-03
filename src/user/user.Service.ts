import {DB} from '../database/connection';
import { v4 as uuidv4 } from 'uuid';
import {QueryResult} from "mysql2/promise.js";
export class userService {
    private db:DB;

    constructor(){
        this.db = new DB();
    }

    public findUser = async (userid:string):Promise<boolean|string|QueryResult>=>{
        if(userid.replace(" ","")) return "Cannot Check empty id";
        const sql = `SELECT user_id FROM USER_TABLE WHERE USER_ID = '${userid}'`;
        const result:any = await this.db.executeQuery(sql);    
        return result.length === 0 ? false:result;
        // if the user does exist it will return true
    }

    public updateUser = async(uuId:string,updateInfo:{}):Promise<string>=>{

        return "";
    }

    public createUser = async(userId:string,password:string):Promise<string|QueryResult>=>{
        const userExist = await this.findUser(userId);
        try{
            if(!userExist){
                const sql = `INSERT INTO USER_TABLE (user_id,user_password,uuid) VALUES ('${userId}','${password}','${uuidv4()}')`;
                const [result]:any = await this.db.executeQuery(sql);
                return result;
            }else{
                return "";
            }
        }catch(error){
            throw new Error(`'Error at user.Service.ts createUser(): ' ${error}`);
        }
        }

    public deleteUser = async(userId:string, password:string, uuId:string):Promise<boolean>=>{
        try {
            const findUser = await this.findUser(userId);
            if(!findUser){
                const sql = `DELETE FROM user_table WHERE uuid = ${findUser.uuId}`;
                const [result]:any = await this.db.executeQuery(sql);
                console.log(result);
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(`'Error at user.Service.ts deleteUser(): ' ${error}`);

        }
        }
}
