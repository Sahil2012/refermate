import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EmailEditorProps {
  subject: string;
  body: string;
  onSubjectChange: (value: string) => void;
  onBodyChange: (value: string) => void;
}

export const EmailEditor: React.FC<EmailEditorProps> = ({
  subject,
  body,
  onSubjectChange,
  onBodyChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email-subject">Subject Line</Label>
        <Input
          id="email-subject"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Enter email subject"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-body">Email Body</Label>
        <Textarea
          id="email-body"
          value={body}
          onChange={(e) => onBodyChange(e.target.value)}
          className="min-h-72 resize-y"
          placeholder="Enter email body"
        />
      </div>
    </div>
  );
};
