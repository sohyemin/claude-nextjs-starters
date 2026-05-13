import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Palette,
  Code2,
  Layers,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "홈",
  description: "Next.js 16 모던 웹 스타터킷",
};

const features = [
  {
    icon: Zap,
    title: "Next.js 16 + Turbopack",
    description:
      "Turbopack이 기본값으로 설정된 최신 Next.js 16. 빠른 빌드와 HMR을 제공합니다.",
  },
  {
    icon: Palette,
    title: "TailwindCSS v4",
    description:
      "config 파일 없이 CSS에서 직접 테마를 정의하는 최신 Tailwind v4 방식입니다.",
  },
  {
    icon: Code2,
    title: "ShadcnUI (radix-nova)",
    description:
      "radix-nova 스타일 ShadcnUI. oklch 색상 모델 기반 CSS 변수로 구성됩니다.",
  },
  {
    icon: Layers,
    title: "React 19 RSC",
    description:
      "Server Components 기본, Client Components는 명시적 선언. 최적화된 번들 사이즈.",
  },
  {
    icon: Shield,
    title: "검증된 라이브러리",
    description:
      "next-themes, sonner, react-hook-form, zod 등 업계 표준 라이브러리 통합.",
  },
  {
    icon: Sparkles,
    title: "다크 모드 지원",
    description:
      "next-themes 기반 다크/라이트/시스템 모드 지원. SSR 깜빡임 없이 동작합니다.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 px-4 py-24 sm:py-32 text-center">
        <div className="mx-auto max-w-4xl">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
            Next.js 16 · React 19 · TailwindCSS v4
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            모던 웹 개발의{" "}
            <span className="text-primary">시작점</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl mb-10">
            프로덕션 레디 스타터킷. 설정 없이 바로 개발을 시작하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/components">
                컴포넌트 둘러보기 <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">대시보드 예제</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              모든 것이 준비되어 있습니다
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              최신 기술 스택과 Best Practice가 이미 구성된 스타터킷으로 즉시 개발을 시작하세요.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-muted/30 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">지금 시작하세요</h2>
          <p className="text-muted-foreground mb-8">
            이 스타터킷을 기반으로 여러분의 프로젝트를 구축해 보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/components">컴포넌트 갤러리 →</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">로그인 예제</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
