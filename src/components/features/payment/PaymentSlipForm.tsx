import { uploadPaymentSlip } from "@/lib/actions/payment.action";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

type PaymentSlipFormProps = {
  bookingId: number;
};
export default function PaymentSlipForm({ bookingId }: PaymentSlipFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setMessage(null);

    startTransition(async () => {
      const result = await uploadPaymentSlip(bookingId, formData);
      if (result.success) {
        formRef.current?.reset();
        router.refresh();
        return;
      }
      setMessage(result.message ?? "Upload payment slip failed");
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="mt-4 space-y-3.5">
      <input
        name="slip"
        type="file"
        accept="image/*,.pdf"
        required
        className="block w-full text-sm text-pink-300 file:mr-5 file:rounded file:border-0 px-3 py-1.5 file:text-white"
      />
    </form>
  );
}
