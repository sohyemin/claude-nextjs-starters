"use client";

import { useRef, useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const BASE = "https://jsonplaceholder.typicode.com";

function PostSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4 mt-1" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6 mt-1" />
      </CardContent>
    </Card>
  );
}

export function PostsListQuery() {
  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(`${BASE}/posts?_limit=6`);
      if (!res.ok) throw new Error("데이터를 불러올 수 없습니다.");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>데이터를 불러오는 중 오류가 발생했습니다.</span>
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            재시도
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts?.map((post) => (
        <Card key={post.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm line-clamp-2 capitalize">
              {post.title}
            </CardTitle>
            <Badge variant="outline" className="w-fit text-xs">
              User #{post.userId}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground line-clamp-3">
              {post.body}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function PostDetailQuery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ["post", selectedId],
    queryFn: () =>
      fetch(`${BASE}/posts/${selectedId}`).then((r) => r.json()),
    enabled: selectedId !== null,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((id) => (
          <Button
            key={id}
            size="sm"
            variant={selectedId === id ? "default" : "outline"}
            onClick={() => setSelectedId(id)}
          >
            Post #{id}
          </Button>
        ))}
      </div>
      {selectedId && (
        <Card>
          {isLoading ? (
            <CardContent className="pt-6 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-base capitalize">
                  {post?.title}
                </CardTitle>
                <CardDescription>Post #{post?.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{post?.body}</p>
              </CardContent>
            </>
          )}
        </Card>
      )}
      {!selectedId && (
        <p className="text-sm text-muted-foreground">
          버튼을 클릭하면 해당 포스트만 조회합니다 (enabled 옵션).
        </p>
      )}
    </div>
  );
}

const newPostSchema = z.object({
  title: z.string().min(3, "제목은 3자 이상이어야 합니다."),
  body: z.string().min(10, "본문은 10자 이상이어야 합니다."),
});

type NewPostForm = z.infer<typeof newPostSchema>;

export function CreatePostMutation() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState } = useForm<NewPostForm>({
    resolver: zodResolver(newPostSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: NewPostForm) => {
      const res = await fetch(`${BASE}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId: 1 }),
      });
      return res.json();
    },
    onSuccess: (data: Post) => {
      toast.success(`포스트 #${data.id} 생성 완료`);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset();
    },
    onError: () => toast.error("생성에 실패했습니다."),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="space-y-4 max-w-md"
    >
      <div className="space-y-1.5">
        <Label htmlFor="post-title">제목</Label>
        <Input
          id="post-title"
          placeholder="포스트 제목"
          {...register("title")}
        />
        {formState.errors.title && (
          <p className="text-sm text-destructive">
            {formState.errors.title.message}
          </p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="post-body">본문</Label>
        <Textarea
          id="post-body"
          placeholder="포스트 본문을 입력하세요."
          rows={3}
          {...register("body")}
        />
        {formState.errors.body && (
          <p className="text-sm text-destructive">
            {formState.errors.body.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "생성 중..." : "포스트 생성"}
      </Button>
      {mutation.isSuccess && (
        <p className="text-sm text-green-600">
          JSONPlaceholder는 실제로 저장하지 않지만 응답을 반환합니다.
        </p>
      )}
    </form>
  );
}

export function InfinitePostsQuery() {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["posts-infinite"],
    queryFn: ({ pageParam }) =>
      fetch(`${BASE}/posts?_page=${pageParam}&_limit=4`).then((r) => r.json()),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Post[], allPages) =>
      lastPage.length === 4 ? allPages.length + 1 : undefined,
  });

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPosts = data?.pages.flat() ?? [];

  return (
    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => <PostSkeleton key={i} />)
        : allPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm capitalize line-clamp-1">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-xs line-clamp-2 mt-1">
                  {post.body}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
      <div ref={sentinelRef} className="py-2 text-center">
        {isFetchingNextPage && (
          <p className="text-sm text-muted-foreground">불러오는 중...</p>
        )}
        {!hasNextPage && allPosts.length > 0 && (
          <p className="text-sm text-muted-foreground">모든 데이터를 불러왔습니다.</p>
        )}
      </div>
    </div>
  );
}
