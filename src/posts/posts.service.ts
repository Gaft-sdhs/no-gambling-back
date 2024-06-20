import mysql2, { OkPacketParams } from "mysql2";
import { DB } from "../database/connection";
import { v4 as uuidv4 } from 'uuid';


export class postService{
    private db:DB;
    
    constructor(){
        this.db = new DB();
    }
    public findPost = async(title:string):Promise<string>=>{
        try{
            const sql = `select uuId from posts_table where title = '${title}'`;
            const [results]:any = await this.db.executeQuery(sql);
            return "";
        }catch(error){
            throw new Error(`error at posts.service.ts findPost() ${error}`);

        }
    }

    public getAllPosts = async():Promise<mysql2.QueryResult>=>{
        try{
            const sql:string = `select owner, content, views, upload_date from posts_table`;
            const results:any = this.db.executeQuery(sql);
            
            return results as mysql2.QueryResult;
        }catch(error){
            throw new Error(`error at posts.service.ts getAllPosts() ${error}`);
        }
        
        
    }

    public createPost = async(owner:string,content:string):Promise<boolean | number>=>{
        try{
            const sql:string = `insert into posts_table (owner,content,upload_date,uuId) valuse(${owner},${content},sysdate(),${uuidv4()})`;

            const results = this.db.executeQuery2(sql) as OkPacketParams;
                
            if(results.affectedRows == 1){
                return results.affectedRows as number;
            }
        return false;
        }catch(error){
            throw new Error(`error at posts.service.ts createPost(): ${error}`);
        }        

    }

    // public UpdatePost = async(value:string,new_content:string):Promise<string>=>{
    //     try{

    //     }catch(error){
    //         throw new Error(`error at posts.service.ts updatePost(): ${error}`);
    //     }
    //     return ""
    // }

    
}