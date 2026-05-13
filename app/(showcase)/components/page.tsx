import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, Info, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Components",
  description: "ShadcnUI 컴포넌트 갤러리",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">UI Components</h1>
        <p className="text-muted-foreground text-lg">
          ShadcnUI (radix-nova) 기반 컴포넌트 갤러리
        </p>
      </div>

      <Section title="Button">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Badge">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </Section>

      <Section title="Input & Form">
        <div className="max-w-sm space-y-3">
          <div className="space-y-1">
            <Label htmlFor="demo-input">레이블</Label>
            <Input id="demo-input" placeholder="텍스트를 입력하세요" />
          </div>
          <Input placeholder="이메일" type="email" />
          <Input placeholder="비밀번호" type="password" />
          <Textarea placeholder="여러 줄 텍스트 입력" rows={3} />
          <Input disabled placeholder="비활성화된 입력 필드" />
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Checkbox id="demo-check" />
            <Label htmlFor="demo-check">체크박스</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="demo-switch" />
            <Label htmlFor="demo-switch">스위치</Label>
          </div>
        </div>
      </Section>

      <Section title="Card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드 설명 텍스트입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                카드 본문 내용이 여기에 들어갑니다.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">확인</Button>
              <Button variant="outline" size="sm">
                취소
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>통계 카드</CardTitle>
              <CardDescription>이번 달 실적</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">12,345</p>
              <p className="text-xs text-muted-foreground mt-1">
                지난 달 대비 +12%
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Avatar">
        <div className="flex flex-wrap gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-xl">AB</AvatarFallback>
          </Avatar>
        </div>
      </Section>

      <Section title="Progress & Skeleton">
        <div className="max-w-sm space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">25%</p>
            <Progress value={25} />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">60%</p>
            <Progress value={60} />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">90%</p>
            <Progress value={90} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </Section>

      <Section title="Alert">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>안내</AlertTitle>
          <AlertDescription>
            일반 안내 메시지입니다. 사용자에게 정보를 전달합니다.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>
            오류가 발생했습니다. 다시 시도해 주세요.
          </AlertDescription>
        </Alert>
      </Section>

      <Section title="Tabs">
        <Tabs defaultValue="tab1" className="max-w-md">
          <TabsList>
            <TabsTrigger value="tab1">계정</TabsTrigger>
            <TabsTrigger value="tab2">보안</TabsTrigger>
            <TabsTrigger value="tab3">알림</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            <p className="text-sm text-muted-foreground">
              계정 설정 탭 내용입니다.
            </p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            <p className="text-sm text-muted-foreground">
              보안 설정 탭 내용입니다.
            </p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-4">
            <p className="text-sm text-muted-foreground">
              알림 설정 탭 내용입니다.
            </p>
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="Accordion">
        <Accordion type="single" collapsible className="max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>ShadcnUI란 무엇인가요?</AccordionTrigger>
            <AccordionContent>
              ShadcnUI는 Radix UI 기반으로 만들어진 재사용 가능한 컴포넌트
              모음입니다. 직접 복사해서 사용하는 방식으로 완전한 제어권을
              제공합니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>TailwindCSS v4의 특징은?</AccordionTrigger>
            <AccordionContent>
              TailwindCSS v4는 config 파일 없이 CSS에서 직접 테마를 정의하며,
              Turbopack과의 통합으로 더 빠른 빌드를 제공합니다.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Next.js 16의 주요 변경점은?</AccordionTrigger>
            <AccordionContent>
              params와 searchParams가 비동기(Promise)로 변경되었고,
              middleware가 proxy로 이름이 바뀌었으며, Turbopack이 기본값이
              되었습니다.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Separator">
        <div className="space-y-4 max-w-md">
          <p className="text-sm text-muted-foreground">수평 구분선</p>
          <Separator />
          <div className="flex h-8 items-center gap-4">
            <span className="text-sm">왼쪽</span>
            <Separator orientation="vertical" />
            <span className="text-sm">오른쪽</span>
          </div>
        </div>
      </Section>
    </div>
  );
}
