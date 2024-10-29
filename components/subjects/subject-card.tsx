import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface SubjectCardProps {
  name: string;
  description: string;
  totalCards: number;
  dueCards: number;
  onClick: () => void;
}

export function SubjectCard({
  name,
  description,
  totalCards,
  dueCards,
  onClick,
}: SubjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          {name}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Total cards: {totalCards}
            </p>
            <p className="text-sm font-medium text-primary">
              Due today: {dueCards}
            </p>
          </div>
          <Button onClick={onClick} variant="secondary">
            Study Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}