"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const cardData = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `카드 ${i + 1}`,
  description: "예시 카드 콘텐츠",
}));

const colClasses: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-2 lg:grid-cols-4",
};

export function LayoutTabs() {
  return (
    <Tabs defaultValue="3">
      <TabsList>
        <TabsTrigger value="1">1열</TabsTrigger>
        <TabsTrigger value="2">2열</TabsTrigger>
        <TabsTrigger value="3">3열</TabsTrigger>
        <TabsTrigger value="4">4열</TabsTrigger>
      </TabsList>
      {Object.keys(colClasses).map((col) => (
        <TabsContent key={col} value={col}>
          <div className={`grid ${colClasses[col]} gap-4`}>
            {cardData.map((card) => (
              <Card key={card.id}>
                <CardContent className="p-4">
                  <p className="font-medium text-sm">{card.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
