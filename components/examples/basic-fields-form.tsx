"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const schema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일 주소를 입력해 주세요."),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, "전화번호는 숫자 10~11자리여야 합니다."),
  bio: z.string().max(200, "소개는 200자 이내로 작성해 주세요.").optional(),
  country: z.enum(["kr", "us", "jp"]).refine((v) => !!v, {
    message: "국가를 선택해 주세요.",
  }),
  gender: z.enum(["male", "female", "other"]).refine((v) => !!v, {
    message: "성별을 선택해 주세요.",
  }),
  agreeTerms: z
    .boolean()
    .refine((v) => v === true, "이용약관에 동의해 주세요."),
  notifications: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export function BasicFieldsForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      notifications: true,
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log(data);
    toast.success("폼이 성공적으로 제출되었습니다.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">이름</Label>
          <Input id="name" placeholder="홍길동" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">전화번호</Label>
          <Input id="phone" placeholder="01012345678" {...register("phone")} />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bio">자기소개</Label>
        <Textarea
          id="bio"
          placeholder="간략한 소개를 입력해 주세요. (최대 200자)"
          rows={3}
          {...register("bio")}
        />
        {errors.bio && (
          <p className="text-sm text-destructive">{errors.bio.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label>국가</Label>
        <Select onValueChange={(v) => setValue("country", v as "kr" | "us" | "jp")}>
          <SelectTrigger>
            <SelectValue placeholder="국가를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kr">대한민국</SelectItem>
            <SelectItem value="us">미국</SelectItem>
            <SelectItem value="jp">일본</SelectItem>
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-sm text-destructive">{errors.country.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>성별</Label>
        <RadioGroup
          onValueChange={(v) =>
            setValue("gender", v as "male" | "female" | "other")
          }
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="font-normal cursor-pointer">
              남성
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="font-normal cursor-pointer">
              여성
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="font-normal cursor-pointer">
              기타
            </Label>
          </div>
        </RadioGroup>
        {errors.gender && (
          <p className="text-sm text-destructive">{errors.gender.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <Label htmlFor="notifications" className="cursor-pointer">
            이메일 알림
          </Label>
          <p className="text-sm text-muted-foreground">
            새 소식을 이메일로 받습니다.
          </p>
        </div>
        <Switch
          id="notifications"
          checked={watch("notifications")}
          onCheckedChange={(v) => setValue("notifications", v)}
        />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="agreeTerms"
          checked={watch("agreeTerms")}
          onCheckedChange={(v) => setValue("agreeTerms", v === true)}
        />
        <div>
          <Label htmlFor="agreeTerms" className="cursor-pointer">
            이용약관에 동의합니다.
          </Label>
          {errors.agreeTerms && (
            <p className="text-sm text-destructive">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "제출 중..." : "제출하기"}
      </Button>
    </form>
  );
}
