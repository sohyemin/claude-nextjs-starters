"use client";

import { useState } from "react";
import { useInterval } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function IntervalDemo() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useInterval(
    () => setCount((c) => c + 1),
    running ? 1000 : null
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold tabular-nums w-16">{count}</span>
        <Badge variant={running ? "default" : "secondary"}>
          {running ? "실행 중 (1초마다)" : "정지"}
        </Badge>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={running ? "outline" : "default"}
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "정지" : "시작"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setCount(0);
            setRunning(false);
          }}
        >
          리셋
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        delay를 null로 설정하면 인터벌이 정지됩니다.
      </p>
    </div>
  );
}
