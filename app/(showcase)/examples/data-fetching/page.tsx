import type { Metadata } from "next";
import { Section } from "@/components/examples/section";
import { CodeBlock } from "@/components/examples/code-block";
import {
  PostsListQuery,
  PostDetailQuery,
  CreatePostMutation,
  InfinitePostsQuery,
} from "@/components/examples/posts-query";

export const metadata: Metadata = {
  title: "데이터 페칭",
};

const useQueryCode = `const { data, isLoading, isError, refetch } = useQuery<Post[]>({
  queryKey: ["posts"],
  queryFn: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=6");
    if (!res.ok) throw new Error("데이터를 불러올 수 없습니다.");
    return res.json();
  },
});`;

const enabledCode = `const { data: post, isLoading } = useQuery<Post>({
  queryKey: ["post", selectedId],
  queryFn: () => fetch(\`/posts/\${selectedId}\`).then((r) => r.json()),
  enabled: selectedId !== null, // selectedId가 있을 때만 실행
});`;

const mutationCode = `const mutation = useMutation({
  mutationFn: async (data) => {
    const res = await fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    toast.success("생성 완료");
  },
});`;

const infiniteCode = `const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ["posts-infinite"],
  queryFn: ({ pageParam }) =>
    fetch(\`/posts?_page=\${pageParam}&_limit=4\`).then((r) => r.json()),
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) =>
    lastPage.length === 4 ? allPages.length + 1 : undefined,
});

// IntersectionObserver sentinel 패턴
const sentinelRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && hasNextPage) fetchNextPage();
  });
  if (sentinelRef.current) observer.observe(sentinelRef.current);
  return () => observer.disconnect();
}, [hasNextPage, fetchNextPage]);`;

export default function DataFetchingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">데이터 페칭</h1>
        <p className="text-lg text-muted-foreground">
          TanStack Query v5로 서버 상태를 관리하는 패턴. JSONPlaceholder API를 활용합니다.
        </p>
      </div>

      <Section
        title="useQuery — 목록 조회"
        description="로딩 중에는 Skeleton, 오류 시에는 Alert + 재시도 버튼을 표시합니다."
      >
        <PostsListQuery />
        <CodeBlock code={useQueryCode} language="tsx" />
      </Section>

      <Section
        title="useQuery (enabled) — 조건부 조회"
        description="enabled 옵션으로 조건이 충족될 때만 쿼리를 실행합니다."
      >
        <PostDetailQuery />
        <CodeBlock code={enabledCode} language="tsx" />
      </Section>

      <Section
        title="useMutation — 데이터 생성"
        description="onSuccess에서 invalidateQueries로 목록을 자동 갱신합니다."
      >
        <CreatePostMutation />
        <CodeBlock code={mutationCode} language="tsx" />
      </Section>

      <Section
        title="useInfiniteQuery — 인피니트 스크롤"
        description="IntersectionObserver sentinel 패턴으로 스크롤이 끝에 도달하면 다음 페이지를 로드합니다."
      >
        <InfinitePostsQuery />
        <CodeBlock code={infiniteCode} language="tsx" />
      </Section>
    </div>
  );
}
