"use client";

import { useMediaQuery } from "usehooks-ts";
import { Badge } from "@/components/ui/badge";

const queries = [
  { label: "모바일 (max-width: 639px)", query: "(max-width: 639px)" },
  { label: "태블릿 이상 (min-width: 768px)", query: "(min-width: 768px)" },
  { label: "데스크탑 (min-width: 1024px)", query: "(min-width: 1024px)" },
  {
    label: "다크모드 선호",
    query: "(prefers-color-scheme: dark)",
  },
  {
    label: "모션 감소 선호",
    query: "(prefers-reduced-motion: reduce)",
  },
];

export function MediaQueryDemo() {
  const mobile = useMediaQuery("(max-width: 639px)");
  const tablet = useMediaQuery("(min-width: 768px)");
  const desktop = useMediaQuery("(min-width: 1024px)");
  const dark = useMediaQuery("(prefers-color-scheme: dark)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const results = [mobile, tablet, desktop, dark, reducedMotion];

  return (
    <div className="space-y-2">
      {queries.map((q, i) => (
        <div key={q.query} className="flex items-center justify-between gap-4">
          <code className="text-xs font-mono text-muted-foreground flex-1 truncate">
            {q.query}
          </code>
          <Badge
            variant={results[i] ? "default" : "outline"}
            className="shrink-0"
          >
            {results[i] ? "true" : "false"}
          </Badge>
        </div>
      ))}
    </div>
  );
}
