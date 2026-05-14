import type { Metadata } from "next";
import { Section } from "@/components/examples/section";
import { CodeBlock } from "@/components/examples/code-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutTabs } from "@/components/examples/layout-tabs";

export const metadata: Metadata = {
  title: "레이아웃 예제",
};

const twoColCode = `<div className="grid grid-cols-[240px_1fr] gap-4 h-[400px]">
  <aside className="bg-muted rounded-lg p-4">
    사이드바
  </aside>
  <main className="bg-card rounded-lg border p-4 overflow-auto">
    메인 콘텐츠
  </main>
</div>`;

const threeColCode = `<div className="grid grid-cols-1 md:grid-cols-[200px_1fr_200px] gap-4">
  <aside>좌측 사이드바</aside>
  <main>메인 콘텐츠</main>
  <aside>관련 정보</aside>
</div>`;

const masonryCode = `<div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
  {items.map((item) => (
    <div key={item.id} className="break-inside-avoid mb-4">
      <Card style={{ height: item.height }}>...</Card>
    </div>
  ))}
</div>`;

const stickyCode = `<div className="relative h-[400px] border rounded-lg overflow-hidden">
  <div className="sticky top-0 z-10 bg-background border-b p-3">
    스티키 헤더
  </div>
  <ScrollArea className="h-full">
    <div className="p-4 space-y-4">
      {/* 긴 콘텐츠 */}
    </div>
  </ScrollArea>
</div>`;

const masonryItems = [
  { id: 1, height: 120, label: "카드 1" },
  { id: 2, height: 200, label: "카드 2" },
  { id: 3, height: 150, label: "카드 3" },
  { id: 4, height: 180, label: "카드 4" },
  { id: 5, height: 100, label: "카드 5" },
  { id: 6, height: 220, label: "카드 6" },
  { id: 7, height: 130, label: "카드 7" },
  { id: 8, height: 160, label: "카드 8" },
  { id: 9, height: 140, label: "카드 9" },
];

export default function LayoutsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">레이아웃 예제</h1>
        <p className="text-lg text-muted-foreground">
          실무에서 자주 사용하는 레이아웃 패턴들을 시각적으로 확인하세요.
        </p>
      </div>

      <Section
        title="2단 레이아웃"
        description="고정 너비 사이드바와 유동 메인 영역. grid-cols-[240px_1fr] 패턴."
      >
        <div className="grid grid-cols-[240px_1fr] gap-4 h-[200px]">
          <aside className="bg-muted rounded-lg p-4 flex flex-col gap-2">
            <p className="text-sm font-semibold mb-1">사이드바</p>
            {["메뉴 1", "메뉴 2", "메뉴 3"].map((m) => (
              <div
                key={m}
                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer rounded px-2 py-1 hover:bg-background transition-colors"
              >
                {m}
              </div>
            ))}
          </aside>
          <main className="bg-card rounded-lg border p-4">
            <p className="text-sm font-semibold mb-2">메인 콘텐츠</p>
            <p className="text-sm text-muted-foreground">
              유동 너비 메인 영역입니다. 사이드바는 240px 고정이고 메인은 나머지 공간을 모두 차지합니다.
            </p>
          </main>
        </div>
        <CodeBlock code={twoColCode} language="tsx" />
      </Section>

      <Section
        title="3단 레이아웃"
        description="좌우 고정 사이드바와 중앙 유동 메인. 모바일에서는 단일 컬럼으로 전환."
      >
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_180px] gap-4 h-auto md:h-[200px]">
          <aside className="bg-muted rounded-lg p-3">
            <p className="text-sm font-semibold mb-2">좌측</p>
            <p className="text-xs text-muted-foreground">내비게이션 영역</p>
          </aside>
          <main className="bg-card rounded-lg border p-4">
            <p className="text-sm font-semibold mb-2">메인 콘텐츠</p>
            <p className="text-sm text-muted-foreground">
              중앙 콘텐츠 영역입니다. 좌우 사이드바는 180px 고정입니다.
            </p>
          </main>
          <aside className="bg-muted rounded-lg p-3">
            <p className="text-sm font-semibold mb-2">우측</p>
            <p className="text-xs text-muted-foreground">관련 정보 영역</p>
          </aside>
        </div>
        <CodeBlock code={threeColCode} language="tsx" />
      </Section>

      <Section
        title="카드 그리드"
        description="Tabs를 활용해 1~4열 그리드를 전환하는 반응형 레이아웃."
      >
        <LayoutTabs />
      </Section>

      <Section
        title="마소느리(Masonry) 그리드"
        description="CSS columns 속성으로 구현한 Pinterest 스타일 레이아웃. JavaScript 없이 순수 CSS."
      >
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {masonryItems.map((item) => (
            <div key={item.id} className="break-inside-avoid mb-4">
              <Card
                className="flex items-center justify-center"
                style={{ height: item.height }}
              >
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground/60">
                    h: {item.height}px
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <CodeBlock code={masonryCode} language="tsx" />
      </Section>

      <Section
        title="스티키 헤더 + 스크롤 콘텐츠"
        description="컨테이너 내부에서 헤더는 고정되고 콘텐츠만 스크롤되는 패턴."
      >
        <div className="relative h-[300px] border rounded-lg overflow-hidden">
          <div className="sticky top-0 z-10 bg-background border-b px-4 py-3">
            <p className="text-sm font-semibold">스티키 헤더 — 항상 상단 고정</p>
          </div>
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {Array.from({ length: 12 }, (_, i) => (
                <Card key={i}>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm">항목 {i + 1}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
        <CodeBlock code={stickyCode} language="tsx" />
      </Section>
    </div>
  );
}
