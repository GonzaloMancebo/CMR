import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ChartCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function ChartCard({ title, description, icon, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-62">{children}</div>
      </CardContent>
    </Card>
  );
}
