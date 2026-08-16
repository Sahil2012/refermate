import SaveProfileButton from "@/components/function/commons/SaveProfileButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import { User } from "lucide-react";
import { useState } from "react";
import ProfileImage from "./ProfileImage";
import ProfileInfoForm from "./ProfileInfoForm";

const PersonalInfo = () => {
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const hasChanges = () => {
    return firstName !== user?.firstName || lastName !== user.lastName;
  };

  return (
    <Card>
      <CardHeader className="border-b border-border/40 px-6">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          <CardTitle>Personal Information</CardTitle>
        </div>
        <CardDescription>
          Update your photo and personal details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-12 px-6">
          <ProfileImage />
          <ProfileInfoForm
            firstName={firstName}
            lastName={lastName}
            onChangeFirstName={(name) => setFirstName(name)}
            onChangeLastName={(name) => setLastName(name)}
          />
        </div>
        <div className="flex justify-end mt-5">
          <SaveProfileButton
            profile={{ firstName, lastName }}
            hasChanges={hasChanges}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
