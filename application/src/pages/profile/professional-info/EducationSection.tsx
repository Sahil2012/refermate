import SaveProfileButton from "@/components/function/commons/SaveProfileButton";
import EducationEditor from "@/components/function/professional-info-editors/education-editor";
import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/hooks/profile/useProfileData";
import { Education } from "@/lib/types/profileTypes";
import { GraduationCap } from "lucide-react";
import { useState } from "react";

export function EducationSection() {
  const { data: profile } = useProfile();
  const [educations, setEducations] = useState<Education[]>(
    profile?.education || [],
  );

  const hasChanges = () => {
    return JSON.stringify(profile?.education) !== JSON.stringify(educations);
  };

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex it∏ems-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Education</h3>
          </div>
        </div>

        <EducationEditor
          value={educations}
          onChange={(edu) => setEducations(edu)}
        />

        <div className="flex justify-end mt-5">
          <SaveProfileButton
            profile={{ education: educations }}
            hasChanges={hasChanges}
          />
        </div>
      </CardContent>
    </Card>
  );
}
