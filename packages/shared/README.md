# Shared

Shared contains reusable code and resources consumed by multiple projects in this org.

What is it?
- Purpose: Reusable utilities, components, configs, types, or assets for other packages/apps.
- Intended consumers: frontend apps, backend services, or CI pipelines that import this package.

## Zod Schemas, Validation and Types

We use Zod (https://zod.dev) as the single source of truth for runtime validation 
and TypeScript type inference — following the DTO (Data Transfer Object) pattern. 
Define schemas once and reuse them for both validation and typing across client and 
server.

Example
```ts
import { z } from 'zod'

export const userSelectSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(1),
    email: z.string().email(),
})

export const userCreateSchema = z.object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
})

export const userUpdateSchema = z.object({
    username: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
})

export type UserRecord = z.infer<typeof userSelectSchema>
export type UserCreate = z.infer<typeof userCreateSchema>
export type UserUpdate = z.infer<typeof userUpdateSchema>

// runtime validation
const result = userSelectSchema.safeParse(someUnknown);
if (!result.success) {
    // handle validation errors
}
const user: UserRecord = result.data;
```

Why this pattern
- Single source of truth: schema drives both runtime checks and TypeScript types.
- Safer APIs: validate incoming data early with .parse or .safeParse.
- Better DX: clear validation errors and accurate type inference.
- Portable DTOs: reuse schemas across services, tests, and generated documentation.
