import { z } from 'zod';

const noSQLInjection = z
  .string()
  .refine(
    (val) => !/('|--|;|\/\*|\*\/|\\)/.test(val),
    { message: 'Texto contiene posibles patrones de inyección SQL' }
  );

export const UserSchema = z.object({
  email: z.email({ message: 'Correo no válido' })
    .refine((val) => !/('|--|;|\/\*|\*\/|\\)/.test(val), {
      message: 'Correo contiene patrones peligrosos',
    }),

  name: noSQLInjection.min(1, { message: 'El nombre es requerido' }),
  lastName: noSQLInjection.min(1, { message: 'El apellido es requerido' }),
  country: noSQLInjection.min(1, { message: 'El estado es requerido' }),

  birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Formato de fecha inválido. Debe ser YYYY-MM-DD',
    }),

  role: z.union([z.literal(0), z.literal(1)])
});

export const LoginUserSchema = z.object({
  email: z.email({ message: 'Correo no válido' })
    .refine((val) => !/('|--|;|\/\*|\*\/|\\)/.test(val), {
      message: 'Correo contiene patrones peligrosos',
    }),
  password: noSQLInjection.min(8, { message: 'La contraseña es necesaria' }),
  remember: z.boolean().optional().nullable()
});

export type IUser = z.infer<typeof UserSchema>;

export type ILoginUser = z.infer<typeof LoginUserSchema>;