import SaveProfileButton from "@/components/function/commons/SaveProfileButton";
import { SkillsEditor } from "@/components/function/professional-info-editors/skills-editor";
import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/profile/useProfileData";
import { Skill } from "@/lib/types/profileTypes";
import { Code2 } from "lucide-react";
import { useState } from "react";

const SkillsSection = () => {
  const { data: profile } = useProfile();
  const [skills, setSkills] = useState<Skill[]>(profile?.skills || []);

  const hasChanges = () => {
    return JSON.stringify(profile?.skills) !== JSON.stringify(skills);
  };
  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Skills</h3>
        </div>

        <SkillsEditor value={skills} onChange={(skills) => setSkills(skills)} />

        <div className="flex justify-end mt-5">
          <SaveProfileButton
            profile={{ skills: skills }}
            hasChanges={hasChanges}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
