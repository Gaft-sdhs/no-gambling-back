import { Router } from "express";
import { userController } from "../user/user.controller";
import { Middleware } from "../middleware/middleware";

export class userRoutes {
    private userController: userController;
    public router: Router = Router();
    private middleware:Middleware;

    constructor() {
        this.userController = new userController();
        this.middleware = new Middleware();
        this.postRoutes()
        this.getRoutes();
        this.patchRoutes();
    }

    public postRoutes() {
        this.router.route("/createUser").post(this.userController.createNewUser.bind(this.userController));
        this.router.route("/login").post(this.userController.login.bind(this.userController));
    }

    public getRoutes(){
        this.router.route("/findUser").get(this.userController.findExistingUser.bind(this.userController));
    }

    public patchRoutes(){
        this.router.route("/updateUser").all(this.middleware.auth).patch(this.userController.updateUserInfo.bind(this.userController));
    }
}