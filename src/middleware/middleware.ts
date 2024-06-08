import { Request, Response, NextFunction } from "express";

export class Middleware {
    public auth = (req: Request, res: Response, next: NextFunction) => {
        if (req.session && (req.session as any).user?.isLoggin) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
}