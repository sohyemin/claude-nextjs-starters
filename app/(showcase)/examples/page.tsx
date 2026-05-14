import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Layout,
  Zap,
  Database,
  Gauge,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "예제",
};

const examples = [
  {
    title: "폼 예제",
    description: "react-hook-form + Zod를 활용한 기본 필드 폼과 다단계 폼 구현 패턴",
    href: "/examples/forms",
    icon: FileText,
  },
  {
    title: "레이아웃 예제",
    description: "2단, 3단, 카드 그리드, 마소느리, 스티키 헤더 등 다양한 레이아웃 패턴",
    href: "/examples/layouts",
    icon: Layout,
  },
  {
    title: "usehooks-ts 예제",
    description: "useLocalStorage, useDebounce, useToggle 등 핵심 훅 인터랙티브 시연",
    href: "/examples/hooks",
    icon: Zap,
  },
  {
    title: "데이터 페칭",
    description: "TanStack Query로 목록 조회, 상세 조회, Mutation, 인피니트 스크롤 구현",
    href: "/examples/data-fetching",
    icon: Database,
  },
  {
    title: "설정 및 최적화",
    description: "next/image, 메타데이터 API, dynamic import, Suspense 경계 패턴",
    href: "/examples/optimization",
    icon: Gauge,
  },
];

export default function ExamplesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">예제</h1>
        <p className="text-lg text-muted-foreground">
          실무에서 자주 사용하는 패턴들을 인터랙티브 예제로 확인하세요.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <Link key={example.href} href={example.href} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <example.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
