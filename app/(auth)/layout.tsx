import Link from "next/link";
import { Code2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-8">
        <Code2 className="h-5 w-5" />
        <span>{siteConfig.name}</span>
      </Link>
      {children}
    </div>
  );
}
