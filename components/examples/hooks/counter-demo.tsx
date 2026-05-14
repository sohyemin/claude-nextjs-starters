"use client";

import { useCounter } from "usehooks-ts";
import { Button } from "@/components/ui/button";

export function CounterDemo() {
  const { count, increment, decrement, reset, setCount } = useCounter(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold tabular-nums w-20 text-center">
          {count}
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={decrement}>
            −
          </Button>
          <Button size="sm" variant="outline" onClick={increment}>
            +
          </Button>
          <Button size="sm" variant="outline" onClick={reset}>
            리셋
          </Button>
          <Button size="sm" variant="outline" onClick={() => setCount(100)}>
            100으로 설정
          </Button>
        </div>
      </div>
    </div>
  );
}
