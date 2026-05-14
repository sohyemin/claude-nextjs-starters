"use client";

import { useLocalStorage } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function LocalStorageDemo() {
  const [value, setValue] = useLocalStorage("starter-demo-key", "초기값");

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="ls-input">저장할 값</Label>
        <Input
          id="ls-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="값을 입력하면 localStorage에 저장됩니다."
        />
      </div>
      <p className="text-sm text-muted-foreground">
        현재 저장된 값:{" "}
        <Badge variant="secondary" className="font-mono">
          {value}
        </Badge>
      </p>
      <p className="text-xs text-muted-foreground">
        브라우저를 새로고침해도 값이 유지됩니다.
      </p>
    </div>
  );
}
