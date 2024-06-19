import { Request, Response, NextFunction } from "express";

export class Middleware {
    public auth = (req: Request, res: Response, next: NextFunction) => {
        if (req.session && (req.session as any).user?.isLoggin) {
            next();
        } else {
            console.log((req.session as any).user)
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
}