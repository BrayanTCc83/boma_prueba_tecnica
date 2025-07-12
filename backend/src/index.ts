import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { COOKIE, validateJWT } from './middleware/validateJWT';
import db from './database/connection';
import { UserService } from './services/UserService';
import { CreateUserSchema, LoginUserSchema, UserSchema } from './interface/user';
import { checkAdminRole } from './middleware/checkAdminRole';
import { AdminService } from './services/AdminService';

const expressApp = express();

const adminRouter = express.Router();
const sessionRouter = express.Router();

expressApp.use(cors({
  origin: process.env.SITE,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

expressApp.use(bodyParser.json({}));
sessionRouter.use(validateJWT);
adminRouter.use(validateJWT, checkAdminRole);

sessionRouter.get('/user', async (req, res) => {
  const userId: string = ((req as any).user.id as string);

  if (!userId) return res.status(400).json({ message: 'Usuario no autenticado' });

  const userService = new UserService(userId);

  const user = await userService.getUser();
  res.json({ user });
});

sessionRouter.get('/is-admin', async (req, res) => {
  const userId: string = ((req as any).user.id as string);

  if (!userId) return res.status(400).json({ message: 'Usuario no autenticado' });

  const userService = new UserService(userId);

  const isAdmin = await userService.isAdmin();
  res.json({ isAdmin });
});

sessionRouter.delete('/logout', (req, res) => {
  res.clearCookie(COOKIE);
  res.json({
    message: 'La sesión fue cerrada correctamente.'
  });
});

expressApp.post('/login', async (req, res) => {
  const data = LoginUserSchema.safeParse(req.body);

  if(!data.success) {
    return res.status(403).json({ message: 'Hay parámetros erroneos en la solicitud', errors: data.error.flatten() });
  }

  try {
    const jwt = await UserService.Login(data.data);
    res.cookie(COOKIE, jwt, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'lax'
    });
    res.json({
      message: 'Success'
    });
  } catch(err) {
    return res.status(403).json({ message: 'Los datos de inicio de sesión son incorrectos.' });
  }
});

adminRouter.get('/users', async (req, res) => {
  const userId: string = ((req as any).user.id as string);

  try {
    const users = await AdminService.getAllUsers();
    res.status(200).json({ users: users.filter( u => (u as any).id !== userId ) });
  } catch(err) {
    res.status(403).json({ message: 'Acceso denegado' });
  }
});

adminRouter.post('/users', async (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);

  if(!data.success) {
    return res.status(400).json({ message: 'Información incompleta', errors: data.error.flatten() });
  }

  try {
    const user = await AdminService.createUser(data.data);
    res.status(200).json({ user });
  } catch(err) {
    console.log(err);
    res.status(403).json({ message: 'Acceso denegado' });
  }
});

adminRouter.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  const data = UserSchema.safeParse(req.body);

  if(!id) {
    return res.status(400).json({ message: 'Información incompleta, es necesario específicar la id' });
  }

  if(!data.success) {
    return res.status(400).json({ message: 'Información incompleta', errors: data.error.flatten() });
  }

  try {
    const user = await AdminService.updateUser(id, data.data);
    res.status(200).json({ message: 'Usuario actualizado de manera exitosa', user });
  } catch(err) {
    console.log(err);
    res.status(403).json({ message: 'Acceso denegado' });
  }
});

adminRouter.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  if(!id) {
    return res.status(400).json({ message: 'Información incompleta, es necesario específicar la id' });
  }

  try {
    const user = await AdminService.deleteUser(id);
    res.status(200).json({ message: 'Usuario eliminado de manera exitosa', user });
  } catch(err) {
    console.log(err);
    res.status(403).json({ message: 'Acceso denegado' });
  }
});

expressApp.get('/', (_, res) => {
  res.send({
    message: 'Inicializando proyecto backend.'
  });
});

expressApp.use('/admin', adminRouter);
expressApp.use('/session', sessionRouter);

expressApp.listen(process.env.PORT, () => {
    console.log(`[Server] Escuchando en el puerto ${process.env.PORT}`);
    db.connect()
        .then( () => console.log(`[Server] La conexión a base de datos fue exitosa.`) )
        .catch( () => console.error(`[Server] No pudo conectarse a la base de datos.`) );
});

export default expressApp;