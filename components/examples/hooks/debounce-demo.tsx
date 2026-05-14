"use client";

import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function DebounceDemo() {
  const [input, setInput] = useState("");
  const [debouncedValue] = useDebounceValue(input, 500);

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="debounce-input">검색어 입력</Label>
        <Input
          id="debounce-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="입력하면 500ms 후에 debounce 값이 갱신됩니다."
        />
      </div>
      <div className="flex gap-4 text-sm flex-wrap">
        <div>
          즉시 값:{" "}
          <Badge variant="outline" className="font-mono">
            {input || "(비어있음)"}
          </Badge>
        </div>
        <div>
          Debounce 값 (500ms):{" "}
          <Badge variant="secondary" className="font-mono">
            {debouncedValue || "(비어있음)"}
          </Badge>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        API 검색 요청을 줄이기 위해 입력이 멈춘 후 일정 시간이 지나면 실제 요청을 보냅니다.
      </p>
    </div>
  );
}
