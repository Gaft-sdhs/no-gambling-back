import {DB} from '../database/connection';

export class userService {
    public findUser = async (userid:string):Promise<boolean>=>{
        return true;
    }

    public updateUser = async(uuId:string,updateInfo:{}):Promise<string>=>{
        return "";
    }

    public createUser = async(userId:string,password:string):Promise<string>=>{
        return "";
    }

    public deleteUser = async(userId:string, password:string, uuId:string):Promise<boolean>=>{
        return true;
    }
}
