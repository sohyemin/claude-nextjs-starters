"use client";

import { useWindowSize } from "usehooks-ts";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Tablet } from "lucide-react";

export function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  const getBreakpoint = () => {
    if (!width) return null;
    if (width < 640) return { label: "sm 미만 (모바일)", icon: Smartphone };
    if (width < 1024) return { label: "md~lg (태블릿)", icon: Tablet };
    return { label: "lg 이상 (데스크탑)", icon: Monitor };
  };

  const bp = getBreakpoint();

  return (
    <div className="space-y-3">
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">너비</span>
          <Badge variant="secondary" className="font-mono">
            {width ?? "–"}px
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">높이</span>
          <Badge variant="secondary" className="font-mono">
            {height ?? "–"}px
          </Badge>
        </div>
      </div>
      {bp && (
        <div className="flex items-center gap-2 text-sm">
          <bp.icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">현재 브레이크포인트:</span>
          <span className="font-medium">{bp.label}</span>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        브라우저 창 크기를 변경하면 실시간으로 업데이트됩니다.
      </p>
    </div>
  );
}
