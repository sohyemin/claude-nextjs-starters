import type { Metadata } from "next";
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "대시보드 예제",
};

const stats = [
  {
    title: "총 매출",
    value: "₩45,231,890",
    change: "+20.1%",
    icon: DollarSign,
  },
  { title: "구독자", value: "+2,350", change: "+180.1%", icon: Users },
  { title: "판매량", value: "+12,234", change: "+19%", icon: ShoppingCart },
  { title: "성장률", value: "+573", change: "+201", icon: TrendingUp },
];

const recentSales = [
  {
    name: "김민준",
    email: "minjun@example.com",
    amount: "₩1,999,000",
    status: "완료",
  },
  {
    name: "이서연",
    email: "seoyeon@example.com",
    amount: "₩39,000",
    status: "완료",
  },
  {
    name: "박지호",
    email: "jiho@example.com",
    amount: "₩299,000",
    status: "처리중",
  },
  {
    name: "최예린",
    email: "yerin@example.com",
    amount: "₩99,000",
    status: "완료",
  },
  {
    name: "정도현",
    email: "dohyun@example.com",
    amount: "₩39,000",
    status: "취소",
  },
];

const statusVariant: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  완료: "default",
  처리중: "secondary",
  취소: "destructive",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">대시보드</h1>
        <p className="text-muted-foreground">이번 달 비즈니스 현황입니다.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                지난달 대비 {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 최근 판매 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>최근 판매</CardTitle>
            <CardDescription>
              이번 달 {recentSales.length}건의 거래가 있었습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>고객</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSales.map((sale, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {sale.name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{sale.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {sale.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{sale.amount}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[sale.status] ?? "outline"}>
                        {sale.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 요약 카드 */}
        <Card>
          <CardHeader>
            <CardTitle>월간 요약</CardTitle>
            <CardDescription>이번 달 핵심 지표</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "신규 고객", value: "128명" },
              { label: "재구매율", value: "64%" },
              { label: "평균 주문액", value: "₩87,200" },
              { label: "반품률", value: "2.1%" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
                <Separator className="mt-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
