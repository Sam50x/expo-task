import jwt from "jsonwebtoken";
import { ResponseError } from "./response.middleware.js";

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) throw new ResponseError(401, "Unauthenticated: No token provided, provide one in the Authorization header")
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err?.name == "TokenExpiredError") throw new ResponseError(498, "Unauthenticated: expired token, please login again or trigger refresh token endpoint")
        if (err) throw new ResponseError(401, "Unauthenticated: Invalid token")
        req.user = payload;
        next();
    })
}