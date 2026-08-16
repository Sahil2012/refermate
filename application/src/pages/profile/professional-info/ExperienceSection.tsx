import SaveProfileButton from "@/components/function/commons/SaveProfileButton";
import ExperienceEditor from "@/components/function/professional-info-editors/experience-editor";
import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/profile/useProfileData";
import { Experience } from "@/lib/types/profileTypes";
import { Briefcase } from "lucide-react";
import { useState } from "react";

const ExperienceSection = () => {
  const { data: profile } = useProfile();
  const [experiences, setExperiences] = useState<Experience[]>(
    profile?.experience || [],
  );

  const hasChanges = () => {
    return JSON.stringify(profile?.experience) !== JSON.stringify(experiences);
  };

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Experience</h3>
          </div>
        </div>

        <ExperienceEditor
          value={experiences}
          onChange={(exp) => setExperiences(exp)}
        />

        <div className="flex justify-end mt-5">
          <SaveProfileButton
            profile={{ experience: experiences }}
            hasChanges={hasChanges}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
