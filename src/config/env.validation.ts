import z from "zod";

const serverEnvSchema = z.object({
  BACKEND_URL: z.url(),
  AUTH_SECRET: z.string().min(32),
});

const resultServer = serverEnvSchema.safeParse(process.env);
if (!resultServer.success) {
  console.error(
    "Invalid server variables:\n",
    z.prettifyError(resultServer.error),
  );
  process.exit(1);
}

export const serverEnv = resultServer.data;
