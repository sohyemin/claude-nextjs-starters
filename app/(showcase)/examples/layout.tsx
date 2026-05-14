"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { examplesNav } from "@/config/site";
import { cn } from "@/lib/utils";

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="border-b bg-background">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex gap-1 overflow-x-auto py-2 no-scrollbar">
            <Link
              href="/examples"
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors",
                pathname === "/examples"
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              전체
            </Link>
            {examplesNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
