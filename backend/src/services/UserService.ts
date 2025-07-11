import db from "../database/connection";
import jwt from 'jsonwebtoken';

import { ILoginUser, IUser } from "../interface/user";

export class UserService {
  private userId: string;

  static async Login(user: ILoginUser) {
    const result = await db.query(
      'SELECT id FROM users WHERE email LIKE $1 AND password LIKE $2',
      [user.email, user.password]
    );
    
    if (result.rowCount === 0) {
      throw new Error('Datos de inicio de sesión incorrectos.');
    }

    const payload = result.rows[0] as IUser;
    return jwt.sign(payload, process.env.TOKEN_SECRET??'', user.remember ? { expiresIn: '7d' } : {});
  }

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * Recupera los datos del usuario desde la base de datos
   */
  async getUser(): Promise<IUser | null> {
    const result = await db.query(
      'SELECT id, email, name, last_name, birth, country, role FROM users WHERE id = $1',
      [this.userId]
    );

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0] as IUser;
  }

  /**
   * Verifica si el usuario tiene rol de administrador (1)
   */
  async isAdmin(): Promise<boolean> {
    const result = await db.query(
      'SELECT role FROM users WHERE id = $1',
      [this.userId]
    );

    if (result.rowCount === 0) {
      return false;
    }

    return result.rows[0].role === 1;
  }
}