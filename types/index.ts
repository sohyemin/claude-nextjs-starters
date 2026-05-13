// 네비게이션 링크 타입
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

// 사이트 설정 타입
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  links: {
    github?: string;
    twitter?: string;
  };
}
