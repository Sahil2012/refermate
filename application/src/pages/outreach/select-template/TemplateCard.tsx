import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Template } from ".";

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
}) => {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md relative overflow-hidden h-full",
        isSelected
          ? "border-primary ring-2 ring-primary/20 bg-primary/5"
          : "hover:border-primary/50",
      )}
      onClick={() => onSelect(template)}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 p-2 bg-primary text-primary-foreground rounded-bl-lg">
          <Check className="w-4 h-4" />
        </div>
      )}
      <CardHeader className="mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-lg">{template.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground overflow-hidden italic text-xs w-full line-clamp-3 whitespace-pre-wrap">
          <span>{template.content}</span>
        </div>
      </CardContent>
    </Card>
  );
};
