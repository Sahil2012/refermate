import { PropsWithThread } from "@/lib/types/commonTypes";
import { Building2 } from "lucide-react";

const CompanyDetails = ({ thread }: PropsWithThread) => {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Building2 className="w-4 h-4" />
      <span className="text-sm">{thread.jobs?.[0]?.company}</span>
    </div>
  );
};

export default CompanyDetails;
