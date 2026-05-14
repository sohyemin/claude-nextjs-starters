"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const LazyCard = dynamic(
  () =>
    import("@/components/ui/card").then((mod) => ({
      default: function DemoCard() {
        return (
          <mod.Card>
            <mod.CardHeader>
              <mod.CardTitle>동적으로 로드된 컴포넌트</mod.CardTitle>
            </mod.CardHeader>
            <mod.CardContent>
              <p className="text-sm text-muted-foreground">
                이 컴포넌트는 버튼을 클릭한 후 동적으로 로드됩니다.
                초기 번들에 포함되지 않아 첫 로드 속도가 빠릅니다.
              </p>
            </mod.CardContent>
          </mod.Card>
        );
      },
    })),
  {
    loading: () => (
      <div className="rounded-lg border p-6 space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    ),
    ssr: false,
  }
);

export function DynamicImportDemo() {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button onClick={() => setShow((s) => !s)} variant={show ? "outline" : "default"}>
          {show ? "숨기기" : "컴포넌트 동적 로드"}
        </Button>
        <Badge variant="secondary">
          {show ? "로드됨" : "아직 로드 안됨"}
        </Badge>
      </div>
      {show && <LazyCard />}
    </div>
  );
}
