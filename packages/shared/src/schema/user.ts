import { z } from 'zod'

const userSelectShape = {
  id: z.cuid2(),
  username: z.string().min(3),
  email: z.email(),
  createdAt: z
    .string()
    .refine(
      (v: string) => !Number.isNaN(Date.parse(v)),
      { message: 'Invalid date' }
    ),
  updatedAt: z
    .string()
    .refine(
      (v: string) => !Number.isNaN(Date.parse(v)),
      { message: 'Invalid date' }
    ),
  deletedAt: z.string().nullable().refine(
    (v: null | string) => v === null || !Number.isNaN(Date.parse(v)),
    { message: 'deletedAt must be a valid date string or null' }
  )
}


export const userRecordSchema = z.object(userSelectShape)
export type UserRecordSchema = z.infer<typeof userRecordSchema>

const userUpdateShape = {
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(6).optional(),
  passwordRepeat: z.string().min(6).optional(),
}

export const userUpdateSchema = z
  .object(userUpdateShape)
  .refine((v) => {
    // Validation when updating password
    if (v.password && v.passwordRepeat) {
      return v.password === v.passwordRepeat
    }

    return true
  }, {
    message: 'Passwords must match',
  })

export type UserUpdate = z.infer<typeof userUpdateSchema>
