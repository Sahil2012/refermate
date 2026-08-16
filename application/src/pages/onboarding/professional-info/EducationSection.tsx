import EducationEditor from "@/components/function/professional-info-editors/education-editor";
import { Card, CardContent } from "@/components/ui/card";
import { Education } from "@/lib/types/profileTypes";
import { GraduationCap } from "lucide-react";

interface EducationSectionProps {
  educations: Education[];
  setEducations: (education: Education[]) => void;
}

export function EducationSection({
  educations,
  setEducations,
}: EducationSectionProps) {
  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Education</h3>
          </div>
        </div>

        <EducationEditor
          value={educations}
          onChange={(edu) => setEducations(edu)}
        />
      </CardContent>
    </Card>
  );
}
