"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const step1Schema = z
  .object({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일 주소를 입력해 주세요."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

const step2Schema = z.object({
  company: z.string().optional(),
  role: z.string().min(1, "직무를 선택해 주세요."),
  bio: z.string().max(300, "소개는 300자 이내로 작성해 주세요.").optional(),
});

const fullSchema = step1Schema.and(step2Schema);
type FormValues = z.infer<typeof fullSchema>;

const STEPS = ["기본 정보", "추가 정보", "확인"];

export function MultiStepForm() {
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
  });

  const handleNext = async () => {
    const fields =
      step === 0
        ? (["name", "email", "password", "confirmPassword"] as const)
        : (["company", "role", "bio"] as const);

    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log(data);
    toast.success("회원가입이 완료되었습니다!");
    setStep(0);
  };

  const values = getValues();

  return (
    <div className="max-w-lg space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={cn(
                "font-medium",
                i <= step ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <Progress value={((step + 1) / STEPS.length) * 100} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="ms-name">이름</Label>
              <Input id="ms-name" placeholder="홍길동" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ms-email">이메일</Label>
              <Input
                id="ms-email"
                type="email"
                placeholder="example@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ms-password">비밀번호</Label>
              <Input
                id="ms-password"
                type="password"
                placeholder="8자 이상"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ms-confirm">비밀번호 확인</Label>
              <Input
                id="ms-confirm"
                type="password"
                placeholder="비밀번호를 다시 입력해 주세요."
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="ms-company">회사명 (선택)</Label>
              <Input
                id="ms-company"
                placeholder="(주) 회사명"
                {...register("company")}
              />
            </div>
            <div className="space-y-1.5">
              <Label>직무</Label>
              <Select onValueChange={(v) => setValue("role", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="직무를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">프론트엔드 개발자</SelectItem>
                  <SelectItem value="backend">백엔드 개발자</SelectItem>
                  <SelectItem value="fullstack">풀스택 개발자</SelectItem>
                  <SelectItem value="designer">디자이너</SelectItem>
                  <SelectItem value="pm">프로덕트 매니저</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-destructive">{errors.role.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ms-bio">자기소개 (선택)</Label>
              <Textarea
                id="ms-bio"
                placeholder="간략하게 소개해 주세요."
                rows={4}
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-destructive">{errors.bio.message}</p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3 rounded-lg border p-5">
            <h3 className="font-semibold">입력 내용 확인</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">이름</span>
                <span>{values.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">이메일</span>
                <span>{values.email}</span>
              </div>
              {values.company && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">회사</span>
                  <span>{values.company}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">직무</span>
                <span>{values.role}</span>
              </div>
              {values.bio && (
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground shrink-0">소개</span>
                  <span className="text-right">{values.bio}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep((s) => s - 1)}
              className="flex-1"
            >
              이전
            </Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex-1"
            >
              다음
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "처리 중..." : "가입하기"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
