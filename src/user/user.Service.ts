import { DB } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';
import { QueryResult, OkPacketParams } from "mysql2/promise.js";
import { User } from "../interface/user";
import bcrypt from "bcrypt";

export class userService {
    private db: DB;

    constructor() {
        this.db = new DB();
    }

    public findUser = async (userid: string): Promise<boolean | string | QueryResult> => {
        if (userid.replace(" ", "") === "") return "Cannot Check empty id";
        const sql = `SELECT * FROM USER_TABLE WHERE USER_ID = '${userid}'`;
        const [result]: any = await this.db.executeQuery(sql);
        return result === undefined ? false as boolean : result as QueryResult;
        // if the user does exist it will return true
    }

    public findUser2 = async (uuId: string): Promise<boolean | string | QueryResult> => {
        if (uuId.replace(" ", "") === "") return "Cannot Check empty id";
        const sql = `SELECT * FROM USER_TABLE WHERE uuId = '${uuId}'`;
        const [result]: any = await this.db.executeQuery(sql);
        return result === undefined ? false as boolean : result as QueryResult;
        // if the user does exist it will return true
    }

    public updateUser = async (uuId: string, updateInfo: {}): Promise<string> => {
        const userExist = await this.findUser2(uuId);
        return "";
    }

    public createUser = async (userId: string, password: string): Promise<string | number> => {
        const userExist = await this.findUser(userId);
        try {
            if (userExist === false) {
                
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);   
                const hashedPw = await bcrypt.hash(password, salt);


                const sql = `INSERT INTO USER_TABLE (user_id,user_password,uuid) VALUES ('${userId}','${hashedPw}','${uuidv4()}')`;

                const result: OkPacketParams = await this.db.executeQuery2(sql);

                console.log(result.affectedRows);

                return result.affectedRows as number;
            } else {
                return "user Already Exist";
            }
        } catch (error) {
            throw new Error(`'Error at user.Service.ts createUser(): ' ${error}`);
        }

    }

    public deleteUser = async (userId: string, password: string, uuId: string): Promise<boolean> => {
        try {
            const findUser = await this.findUser(userId);
            if (!findUser) {
                const sql = `DELETE FROM user_table WHERE uuid = ${uuId}`;
                const [result]: any = await this.db.executeQuery(sql);
                console.log(result);
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(`'Error at user.Service.ts deleteUser(): ' ${error}`);

        }
    }

    public loginUser = async (userId: string, user_password: string): Promise<boolean | User> => {
        try {
            const findUser = await this.findUser(userId) as unknown as User;
            const checkPw = await bcrypt.compare(user_password,findUser.user_password);
            
            if (findUser && checkPw) {
                return findUser;
            } else {
                return false;
            }

        } catch (error) {
            throw new Error(`'Error at user.Service.ts loginUser(): ' ${error}`);

        }
    }
}
