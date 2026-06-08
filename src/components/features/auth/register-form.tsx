"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/actions/auth.action";
import { RegisterInput, registerSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

export default function RegisterForm() {
  const { handleSubmit, control, setError } = useForm<RegisterInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: RegisterInput) => {
    startTransition(async () => {
      const res = await register(data);
      if (res?.success === false && res.code === "EMAIL_ALREADY_EXIST") {
        setError("email", { message: res.message });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <div>
          {/*first name */}
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-white">
                  first Name
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="First Name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/*last name */}
          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name} className="text-white">
                  last Name
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Last Name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Button
          className="relative
w-full
py-6
rounded-2xl
text-white
font-semibold
bg-gradient
from-[#3A001F]
via-[#5B0026]
to-[#8E1A45]
shadow-[0_20px_60px_rgba(255,0,120,0.5)]
flex
items-center
justify-center
gap-3
"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader className="animate-spin" /> Create your account...
            </>
          ) : (
            "Enter the ship"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
