export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-1 pb-2 border-b">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}
