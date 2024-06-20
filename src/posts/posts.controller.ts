import { postService } from "./posts.service";
import { Request,Response } from "express";
import { posts } from "../interface/post";

export class postController extends postService{

    constructor(){
        super();
    }


    public createUserPost = async(req:Request,res:Response):Promise<void>=>{
        const {owner,content} = req.body;
        try{
            const creatPost =await this.createPost(owner,content) as number | boolean;

            if(creatPost){
                res.status(200).json({"msg":"success"});
            }else{
                res.status(500).json({"msg":"failed"});
            }
        }catch(error){
            console.error(`error at posts.controller.ts ${error}`);
        }

    }
}