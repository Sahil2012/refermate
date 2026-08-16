import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle, Clock, UserX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfileStats } from "@/hooks/profile/useProfileData";

export const StatsGrid = () => {
  const { data: stats, isLoading } = useProfileStats();

  const data = [
    {
      label: "Reached Out",
      value: stats?.reachedOut,
      icon: Mail,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Referred",
      value: stats?.referred,
      icon: MessageCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Follow Ups",
      value: stats?.followUp,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Absconded",
      value: stats?.absconded,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item) => (
        <Card key={item.label}>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {item.label}
              </p>
              {isLoading ? (
                <Skeleton className="mt-2 h-6 w-20" />
              ) : (
                <p className={`text-3xl font-bold mt-2 ${item.color}`}>
                  {item.value}
                </p>
              )}
            </div>
            <div
              className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center`}
            >
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
