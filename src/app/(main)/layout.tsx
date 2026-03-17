import Headers from "@/components/layouts/headers";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Headers />
      <div>{children}</div>
    </div>
  );
}
