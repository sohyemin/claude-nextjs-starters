import Link from "next/link";
import { Code2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { siteConfig, footerNav } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2 font-bold mb-3">
              <Code2 className="h-4 w-4" />
              <span>{siteConfig.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* 리소스 */}
          <div>
            <h3 className="font-semibold text-sm mb-3">리소스</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerNav.resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 기술 스택 */}
          <div>
            <h3 className="font-semibold text-sm mb-3">기술 스택</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerNav.stack.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js 16 & ShadcnUI.
        </p>
      </div>
    </footer>
  );
}
