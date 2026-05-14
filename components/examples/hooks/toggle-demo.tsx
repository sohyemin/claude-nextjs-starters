"use client";

import { useToggle } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export function ToggleDemo() {
  const [isOn, toggle, setIsOn] = useToggle(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Switch checked={isOn} onCheckedChange={setIsOn} />
        <Badge variant={isOn ? "default" : "secondary"}>
          {isOn ? "켜짐" : "꺼짐"}
        </Badge>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={toggle}>
          toggle()
        </Button>
        <Button size="sm" variant="outline" onClick={() => setIsOn(true)}>
          setIsOn(true)
        </Button>
        <Button size="sm" variant="outline" onClick={() => setIsOn(false)}>
          setIsOn(false)
        </Button>
      </div>
    </div>
  );
}
