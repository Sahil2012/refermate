import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { FormComponentProps } from "../RecipientForm";

const JobIds = ({
  value,
  onChange,
  className,
}: FormComponentProps<string | string[]>) => {
  const [currentJobId, setCurrentJobId] = useState("");

  if (typeof value === "string") return null;

  const jobIds = value ?? [];

  const handleAddJobId = () => {
    if (currentJobId.trim() && !jobIds.includes(currentJobId.trim())) {
      onChange([...jobIds, currentJobId.trim()]);
      setCurrentJobId("");
    }
  };

  const handleRemoveJobId = (jobIdToRemove: string) => {
    onChange(jobIds.filter((id) => id !== jobIdToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddJobId();
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="job-ids">Job IDs</Label>
      <div className="flex gap-2">
        <Input
          id="job-ids"
          value={currentJobId}
          onChange={(e) => setCurrentJobId(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a job ID and press Enter..."
          className="flex-1"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddJobId}
          disabled={!currentJobId.trim()}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {jobIds.map((jobId, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="px-3 py-1 text-sm font-medium flex items-center gap-1"
          >
            {jobId}
            <button
              type="button"
              onClick={() => handleRemoveJobId(jobId)}
              className="ml-1 hover:text-destructive focus:outline-none"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        {jobIds.length === 0 && (
          <p className="text-sm text-muted-foreground pl-2">
            No job IDs added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobIds;
