import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { useProfileActions } from "@/hooks/profile/useProfileActions";
import { useUser } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../Layout";
import { ResumeUpload } from "./ResumeUpload";

export default function BasicInfoPage() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { updateProfile, uploadResume } = useProfileActions();
  const isLoading = uploadResume.isPending || updateProfile.isPending;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [autofill, setAutofill] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [isLoaded, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (resume) {
        await uploadResume.mutateAsync({ resume, autofill });
      }

      await updateProfile.mutateAsync({ firstName, lastName });
      navigate("/onboarding/professional-info");
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center p-8">
        <Loader />
      </div>
    );
  }

  return (
    <Layout
      header="Welcome to Outreach"
      description="Let's get you set up. First, tell us a bit about yourself."
    >
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.primaryEmailAddress?.emailAddress || ""}
                disabled
                className="bg-muted/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                type="tel"
              />
            </div>

            <ResumeUpload
              resume={resume}
              onChange={(resume) => setResume(resume)}
            />

            <div className="flex justify-center items-center space-x-2 pb-2">
              <Checkbox
                id="autofill"
                checked={autofill}
                onCheckedChange={(checked) => setAutofill(checked as boolean)}
              />
              <Label htmlFor="autofill" className="text-sm font-normal">
                Autofill Profile details from resume
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="w-4 h-4 mr-2" /> : null}
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
}
