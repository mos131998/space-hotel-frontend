import z from "zod";

const serverEnvSchema = z.object({
  BACKEND_URL: z.string().url(),
  AUTH_SECRET: z.string().min(32),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string().url(),
});

const resultServer = serverEnvSchema.safeParse(process.env);
if (!resultServer.success) {
  console.error(
    "Invalid server variables:\n",
    z.prettifyError(resultServer.error),
  );
  process.exit(1);
}
const resultClient = clientEnvSchema.safeParse(process.env);
if (!resultClient.success) {
  console.error(
    "Invalid client variables:\n",
    z.prettifyError(resultClient.error),
  );
  process.exit(1);
}

export const serverEnv = resultServer.data;
export const clientEnv = resultClient.data;
