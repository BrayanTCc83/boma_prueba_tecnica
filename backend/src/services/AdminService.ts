import db from "../database/connection";
import { ICreateUser, IUser } from "../interface/user";

export class AdminService {
  static async getAllUsers(): Promise<IUser[]> {
    const result = await db.query(
      'SELECT id, email, name, last_name as "lastName", birth, country, role FROM users'
    );
    return result.rows;
  }

  static async createUser(data: ICreateUser): Promise<IUser> {
    const result = await db.query(
      `INSERT INTO users (email, password, name, last_name, birth, country, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, email, name, last_name as "lastName", birth, country, role`,
      [data.email, data.password, data.name, data.lastName, data.birth, data.country, data.role]
    );

    return result.rows[0];
  }

  static async updateUser(id: string, data: IUser) {
    const fields = [];
    const values: any[] = [];
    let idx = 1;

    if (data.email !== undefined) {
      fields.push(`email = $${idx++}`);
      values.push(data.email);
    }
    if (data.name !== undefined) {
      fields.push(`name = $${idx++}`);
      values.push(data.name);
    }
    if (data.lastName !== undefined) {
      fields.push(`last_name = $${idx++}`);
      values.push(data.lastName);
    }
    if (data.birth !== undefined) {
      fields.push(`birth = $${idx++}`);
      values.push(data.birth);
    }
    if (data.country !== undefined) {
      fields.push(`country = $${idx++}`);
      values.push(data.country);
    }
    if (data.role !== undefined) {
      fields.push(`role = $${idx++}`);
      values.push(data.role);
    }

    if (fields.length === 0) {
      throw new Error('No hay campos para actualizar');
    }

    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;

    const result = await db.query(query, values);
    if (result.rowCount === 0) {
      throw new Error('Usuario no encontrado');
    }
    return result.rows[0];
  }

  static async deleteUser(id: string) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) {
      throw new Error('Usuario no encontrado');
    }
    return result.rows[0];
  }
}
