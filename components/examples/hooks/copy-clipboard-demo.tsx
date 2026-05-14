"use client";

import { useCopyToClipboard } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Copy } from "lucide-react";

const snippets = [
  "npm install usehooks-ts",
  "import { useLocalStorage } from 'usehooks-ts'",
  "const [value, setValue] = useLocalStorage('key', 'default')",
];

export function CopyClipboardDemo() {
  const [copiedText, copy] = useCopyToClipboard();

  return (
    <div className="space-y-3">
      {snippets.map((snippet) => (
        <div
          key={snippet}
          className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 bg-muted/30"
        >
          <code className="text-sm font-mono truncate">{snippet}</code>
          <Button
            size="sm"
            variant="ghost"
            className="shrink-0"
            onClick={() => copy(snippet)}
          >
            {copiedText === snippet ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      ))}
      {copiedText && (
        <p className="text-sm text-muted-foreground">
          복사됨:{" "}
          <Badge variant="outline" className="font-mono text-xs">
            {copiedText}
          </Badge>
        </p>
      )}
    </div>
  );
}
