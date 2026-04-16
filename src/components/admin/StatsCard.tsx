import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: { value: number; label: string };
  color?: "green" | "yellow" | "blue" | "red" | "purple";
}

const colorMap = {
  green: { bg: "bg-green-100", icon: "text-green-700", border: "border-green-200" },
  yellow: { bg: "bg-yellow-100", icon: "text-yellow-700", border: "border-yellow-200" },
  blue: { bg: "bg-blue-100", icon: "text-blue-700", border: "border-blue-200" },
  red: { bg: "bg-red-100", icon: "text-red-700", border: "border-red-200" },
  purple: { bg: "bg-purple-100", icon: "text-purple-700", border: "border-purple-200" },
};

export default function StatsCard({ title, value, icon: Icon, description, color = "green" }: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <Card className={cn("border", colors.border, "hover:shadow-md transition-shadow")}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className={cn("p-2.5 rounded-lg", colors.bg)}>
            <Icon className={cn("w-5 h-5", colors.icon)} />
          </div>
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
