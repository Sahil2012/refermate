import { Experience } from "@/lib/types/profileTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";

interface DisplayCardProps {
  experience: Experience;
  onEdit: () => void;
  onDelete: () => void;
}

const DisplayCard = ({ experience, onEdit, onDelete }: DisplayCardProps) => {
  return (
    <Card size="sm" className="bg-muted/10 border-border/40">
      <CardContent className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{experience.role}</h4>
          <p className="text-sm text-muted-foreground">{experience.company}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            {experience.startDate && (
              <span>{format(new Date(experience.startDate), "MMM yyyy")}</span>
            )}
            {(experience.startDate || experience.endDate) && <span>-</span>}
            {experience.endDate ? (
              <span>{format(new Date(experience.endDate), "MMM yyyy")}</span>
            ) : (
              experience.startDate && <span>Present</span>
            )}
          </div>
          {experience.description && (
            <p className="text-sm mt-2">{experience.description}</p>
          )}
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
