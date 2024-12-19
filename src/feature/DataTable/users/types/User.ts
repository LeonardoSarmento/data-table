import { z } from 'zod';

import { Filters, PaginatedData } from '../../types/tables/FilterExtension';

export const roleSchema = z.enum(['ADMIN', 'OPERATOR']);

export type RolesType = z.infer<typeof roleSchema>;

export const UserTable = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: roleSchema.array(),
  birthday: z.date(),
});

export type UserTableType = z.infer<typeof UserTable>;
export type UserFilters = Filters<UserTableType>;
export type UserRequest = PaginatedData<UserTableType>;

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(3, { message: 'Nome muito curto' }).trim(),
  email: z.string().email({ message: 'E-mail inválido' }).trim(),
  company: z.string().trim().optional(),
  role: roleSchema,
});

export type UserType = z.infer<typeof UserSchema>;
