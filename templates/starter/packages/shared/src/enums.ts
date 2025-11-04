import { z } from 'zod'

export const userRoleEnum = z.enum([
  'sysadmin',
  'admin',
  'staff',
  'user',
])

export type UserRole = z.infer<typeof userRoleEnum>
