"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function RegisterForm() {
  return (
    <form>
      <FieldGroup>
        <div>
          {/*first name */}
          <Field>
            <FieldLabel className="text-white">first Name</FieldLabel>
            <Input placeholder="First Name" />
          </Field>

          {/*last name */}
          <Field>
            <FieldLabel className="text-white">last Name</FieldLabel>
            <Input placeholder="last Name" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {/*email */}
          <Field>
            <FieldLabel className="text-white">Email</FieldLabel>
            <Input placeholder="Email" />
          </Field>

          {/*password */}
          <Field>
            <FieldLabel className="text-white">Password</FieldLabel>
            <Input placeholder="Password" />
          </Field>
        </div>
      </FieldGroup>
    </form>
  );
}
