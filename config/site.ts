import type { NavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "StarterKit",
  description: "Next.js 16 + React 19 + TailwindCSS v4 + ShadcnUI 모던 웹 스타터킷",
  url: "https://example.com",
  links: {
    github: "https://github.com",
  },
};

export const mainNav: NavItem[] = [
  { title: "홈", href: "/" },
  { title: "컴포넌트", href: "/components" },
  { title: "예제", href: "/examples" },
  { title: "대시보드", href: "/dashboard" },
];

export const examplesNav: NavItem[] = [
  {
    title: "폼",
    href: "/examples/forms",
    description: "react-hook-form + Zod 다단계 폼",
  },
  {
    title: "레이아웃",
    href: "/examples/layouts",
    description: "2단, 3단, 그리드, 마소느리 패턴",
  },
  {
    title: "훅",
    href: "/examples/hooks",
    description: "usehooks-ts 핵심 훅 시연",
  },
  {
    title: "데이터 페칭",
    href: "/examples/data-fetching",
    description: "TanStack Query + JSONPlaceholder",
  },
  {
    title: "최적화",
    href: "/examples/optimization",
    description: "next/image, 메타데이터, 코드 스플리팅",
  },
];

export const dashboardNav: NavItem[] = [
  { title: "Overview", href: "/dashboard" },
  { title: "Analytics", href: "/dashboard/analytics", disabled: true },
  { title: "고객", href: "/dashboard/customers", disabled: true },
  { title: "제품", href: "/dashboard/products", disabled: true },
  { title: "설정", href: "/dashboard/settings", disabled: true },
];

export const footerNav = {
  resources: [
    { title: "문서", href: "/" },
    { title: "컴포넌트", href: "/components" },
    { title: "대시보드 예제", href: "/dashboard" },
  ] as NavItem[],
  stack: [
    { title: "Next.js 16", href: "https://nextjs.org", external: true },
    { title: "TailwindCSS v4", href: "https://tailwindcss.com", external: true },
    { title: "ShadcnUI", href: "https://ui.shadcn.com", external: true },
    { title: "Radix UI", href: "https://radix-ui.com", external: true },
  ] as NavItem[],
};
