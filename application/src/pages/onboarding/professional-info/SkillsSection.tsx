import { SkillsEditor } from "@/components/function/professional-info-editors/skills-editor";
import { Card, CardContent } from "@/components/ui/card";
import { Code2 } from "lucide-react";

interface SkillsSectionProps {
  skills: { name: string }[];
  setSkills: (skills: { name: string }[]) => void;
}

export function SkillsSection({
  skills,
  setSkills,
}: Readonly<SkillsSectionProps>) {
  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Skills</h3>
        </div>

        <SkillsEditor value={skills} onChange={(skills) => setSkills(skills)} />
      </CardContent>
    </Card>
  );
}
