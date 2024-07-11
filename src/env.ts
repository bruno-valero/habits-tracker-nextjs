import { z } from 'zod'

const publicEnvs = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
}

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
})

const _env = envSchema.safeParse(publicEnvs)

if (!_env.success)
  throw new Error(
    `environment variables validation: ${JSON.stringify(_env.error.format(), null, 2)}`,
  )

export const env = _env.data
