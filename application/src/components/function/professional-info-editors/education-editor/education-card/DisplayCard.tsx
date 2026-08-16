import { Education } from "@/lib/types/profileTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

interface DisplayCardProps {
  education: Education;
  onEdit: () => void;
  onDelete: () => void;
}

const DisplayCard = ({ education, onEdit, onDelete }: DisplayCardProps) => {
  return (
    <Card size="sm" className="bg-muted/10 border-border/40">
      <CardContent className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{education.institution}</h4>
          <p className="text-sm text-muted-foreground">
            {education.degree}{" "}
            {education.field_of_study && `in ${education.field_of_study}`}
          </p>
          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
            {education.year_of_passing && (
              <span>Class of {education.year_of_passing}</span>
            )}
            {education.grade && <span>Grade: {education.grade}</span>}
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit()}
            className="text-muted-foreground hover:text-primary"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete()}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisplayCard;
