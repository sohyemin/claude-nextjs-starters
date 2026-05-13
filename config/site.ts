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
  { title: "대시보드", href: "/dashboard" },
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
