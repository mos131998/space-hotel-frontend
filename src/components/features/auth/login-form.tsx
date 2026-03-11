"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginInput, loginSchema } from "@/lib/schemas/auth.schema";
import { simLoading } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

export default function LoginForm() {
  const { handleSubmit, control } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      await simLoading();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        {/*email */}
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name} className="text-white">
                email
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/*password */}
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name} className="text-white">
                Password
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="password"
                aria-invalid={fieldState.invalid}
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field className="mt-4">
          <Button
            className=" rounded-full text-white bg-linear-to-r from-[#ff2d95]via-[#ff3ca6] to-[#c000ff] shadow-lg shadow-pink-500/50"
            variant="outline"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" /> login the ship...
              </>
            ) : (
              "Join The Fleet"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
