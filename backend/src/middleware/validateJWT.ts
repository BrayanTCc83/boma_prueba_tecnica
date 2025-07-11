import jwt from 'jsonwebtoken';

import { IUser } from '../interface/user';
import { Request, Response, NextFunction } from 'express';

export const COOKIE = 'boma_prueba_cookie';

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.cookie?.split('=')[1] || (req.cookies && req?.cookies[COOKIE]) ||  (req.signedCookies && req?.signedCookies[COOKIE]);

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error('TOKEN_SECRET no definido en las variables de entorno');
        }

        const payload = jwt.verify(token, secret) as jwt.JwtPayload;
        (req as any).user = payload as IUser;

        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};