import { Request, Response, NextFunction } from 'express';
import db from '../database/connection';

export const checkAdminRole = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    return res.status(400).json({ message: 'ID de usuario no presente en la solicitud' });
  }

  try {
    const result = await db.query(
      'SELECT role FROM users WHERE id = $1',
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { role } = result.rows[0];

    if (role !== 1) {
      return res.status(403).json({ message: 'Acceso denegado: se requiere rol de super administrador' });
    }

    next();
  } catch (error) {
    console.error('Error al verificar rol de usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
