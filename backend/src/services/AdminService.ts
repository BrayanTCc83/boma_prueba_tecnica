import db from "../database/connection";

interface CreateUserData {
  email: string;
  name: string;
  lastName: string;
  birth: string;   // formato YYYY-MM-DD
  country: string;
  role: 0 | 1;
}

interface UpdateUserData {
  email?: string;
  name?: string;
  lastName?: string;
  birth?: string;
  country?: string;
  role?: 0 | 1;
}

export class AdminService {
  async getAllUsers() {
    const result = await db.query(
      'SELECT id, email, name, last_name as "lastName", birth, country, role FROM users'
    );
    return result.rows;
  }

  async createUser(data: CreateUserData) {
    const result = await db.query(
      `INSERT INTO users (email, name, last_name, birth, country, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, name, last_name as "lastName", birth, country, role`,
      [data.email, data.name, data.lastName, data.birth, data.country, data.role]
    );

    return result.rows[0];
  }

  async updateUser(id: string, data: UpdateUserData) {
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

  async deleteUser(id: string) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rowCount === 0) {
      throw new Error('Usuario no encontrado');
    }
    return result.rows[0];
  }
}
