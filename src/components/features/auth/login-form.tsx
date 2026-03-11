import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  return (
    <form>
      <FieldGroup className="gap-4">
        {/*email */}
        <Field>
          <FieldLabel className="text-white">Email</FieldLabel>
          <Input placeholder="Email" />
        </Field>

        {/*Password */}
        <Field>
          <FieldLabel className="text-white">Password</FieldLabel>
          <Input placeholder="Password" />
        </Field>

        <Field className="mt-4">
          <Button
            className=" rounded-full text-white bg-linear-to-r from-[#ff2d95]via-[#ff3ca6] to-[#c000ff] shadow-lg shadow-pink-500/50"
            variant="outline"
          >
            Join The Fleet
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
