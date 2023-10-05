import { Request, Response, NextFunction } from "express";
import passport from "passport";


const authMiddleware = passport.authenticate("jwt", { session: false });

export default authMiddleware;
