    import { Router } from "express";
    import { userController } from "../user/user.controller";

    export class userRoutes {
        private userController:userController;
        public router:Router = Router();

        constructor(){
            this.userController = new userController();
            this.postRoutes()
        }

        public postRoutes(){
            this.router.route("/createUser").post(this.userController.createNewUser.bind(this.userController));
        }

    }