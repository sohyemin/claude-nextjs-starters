import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Section } from "@/components/examples/section";
import { CodeBlock } from "@/components/examples/code-block";
import { DynamicImportDemo } from "@/components/examples/dynamic-demo";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "설정 및 최적화",
  description: "Next.js 최적화 패턴 예제 — next/image, 메타데이터, dynamic import, Suspense",
  openGraph: {
    title: "설정 및 최적화 | StarterKit",
    description: "next/image, 메타데이터 API, dynamic import, Suspense 경계 패턴",
  },
};

async function SlowComponent() {
  await new Promise((r) => setTimeout(r, 1500));
  return (
    <div className="rounded-lg border p-4 bg-card">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="default">로드 완료</Badge>
        <span className="text-sm font-medium">Suspense로 1.5초 지연된 서버 컴포넌트</span>
      </div>
      <p className="text-sm text-muted-foreground">
        이 컴포넌트는 async 서버 컴포넌트입니다. Suspense 경계 덕분에 나머지 페이지는 즉시 렌더링되고,
        이 부분만 스트리밍으로 전달됩니다.
      </p>
    </div>
  );
}

const imageCode = `import Image from "next/image";

// LCP 이미지 — priority로 미리 로드
<Image
  src="https://picsum.photos/800/400"
  alt="히어로 이미지"
  width={800}
  height={400}
  priority
/>

// lazy loading + blur placeholder
<Image
  src="https://picsum.photos/400/300"
  alt="콘텐츠 이미지"
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
/>`;

const metadataCode = `// 정적 메타데이터
export const metadata: Metadata = {
  title: "페이지 제목",
  description: "페이지 설명",
  openGraph: {
    title: "OG 제목",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// 동적 메타데이터 (동적 라우트에서)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params.id);
  return {
    title: post.title,
    description: post.body.slice(0, 160),
  };
}`;

const staticParamsCode = `// app/posts/[id]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch("/api/posts").then((r) => r.json());
  return posts.map((post: { id: number }) => ({
    id: String(post.id),
  }));
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  return <article>{post.title}</article>;
}`;

const dynamicCode = `import dynamic from "next/dynamic";

// SSR 비활성화 (브라우저 전용 라이브러리)
const HeavyChart = dynamic(() => import("@/components/chart"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full" />,
});

// 조건부 로딩
const Modal = dynamic(() => import("@/components/modal"), {
  loading: () => null,
});`;

const suspenseCode = `import { Suspense } from "react";

// async 서버 컴포넌트를 Suspense로 감싸기
<Suspense fallback={<Skeleton className="h-24 w-full" />}>
  <SlowServerComponent />
</Suspense>

// async Server Component
async function SlowServerComponent() {
  await new Promise((r) => setTimeout(r, 1500)); // 지연 시뮬레이션
  return <div>데이터 로드 완료</div>;
}`;

export default function OptimizationPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">설정 및 최적화</h1>
        <p className="text-lg text-muted-foreground">
          Next.js 핵심 최적화 패턴 — 이미지, 메타데이터, 동적 임포트, Suspense
        </p>
      </div>

      <Section
        title="next/image 최적화"
        description="자동 WebP 변환, lazy loading, blur placeholder, LCP priority 설정"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">
              priority — LCP 이미지 (미리 로드)
            </p>
            <Image
              src="https://picsum.photos/seed/priority/800/400"
              alt="LCP 이미지 예제"
              width={800}
              height={400}
              priority
              className="rounded-lg object-cover w-full"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">
              lazy + blur placeholder
            </p>
            <Image
              src="https://picsum.photos/seed/lazy/400/300"
              alt="lazy loading 이미지 예제"
              width={400}
              height={300}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAQQCAgMBAAAAAAAAAAAAAQIDBBEhBRIxYf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCJn1KXWM9JbtMiMMRllXYS7wc8KgkGTmHbvv8Ajhf/2Q=="
              className="rounded-lg object-cover w-full"
            />
          </div>
        </div>
        <CodeBlock code={imageCode} language="tsx" />
      </Section>

      <Section
        title="메타데이터 API"
        description="정적 metadata export와 동적 generateMetadata로 SEO를 최적화합니다."
      >
        <div className="rounded-lg border p-4 bg-muted/30 space-y-2">
          <p className="text-sm font-medium">이 페이지에 적용된 메타데이터</p>
          <div className="text-sm text-muted-foreground space-y-1 font-mono">
            <p>title: &quot;설정 및 최적화 | StarterKit&quot;</p>
            <p>description: &quot;Next.js 최적화 패턴 예제...&quot;</p>
            <p>og:title: &quot;설정 및 최적화 | StarterKit&quot;</p>
          </div>
        </div>
        <CodeBlock code={metadataCode} language="tsx" />
      </Section>

      <Section
        title="동적 라우팅 + generateStaticParams"
        description="빌드 시 정적 경로를 생성하여 SSG 성능을 극대화합니다."
      >
        <CodeBlock code={staticParamsCode} language="tsx" />
      </Section>

      <Section
        title="dynamic() — 코드 스플리팅"
        description="초기 번들을 줄이기 위해 컴포넌트를 필요할 때만 동적으로 로드합니다."
      >
        <DynamicImportDemo />
        <CodeBlock code={dynamicCode} language="tsx" />
      </Section>

      <Section
        title="Suspense 경계 — 스트리밍 SSR"
        description="async 서버 컴포넌트를 Suspense로 감싸면 나머지 페이지는 즉시 렌더링되고 느린 부분만 스트리밍됩니다."
      >
        <Suspense
          fallback={
            <div className="rounded-lg border p-4 space-y-2">
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-4 w-full" />
            </div>
          }
        >
          <SlowComponent />
        </Suspense>
        <CodeBlock code={suspenseCode} language="tsx" />
      </Section>
    </div>
  );
}
