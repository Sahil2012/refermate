import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Check, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface ProjectsSectionProps {
  projects: any[];
  setProjects: (projects: any[]) => void;
}

export function ProjectsSection({
  projects,
  setProjects,
}: ProjectsSectionProps) {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>({ title: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const saveProject = () => {
    if (currentProject.title) {
      if (editingIndex !== null) {
        const updatedProjects = [...projects];
        updatedProjects[editingIndex] = currentProject;
        setProjects(updatedProjects);
        setEditingIndex(null);
      } else {
        setProjects([...projects, currentProject]);
      }
      setCurrentProject({ title: "" });
      setIsAddingProject(false);
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setCurrentProject(projects[index]);
    setIsAddingProject(true);
  };

  const handleDelete = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setCurrentProject({ title: "" });
      setIsAddingProject(false);
    }
  };

  const handleCancel = () => {
    setIsAddingProject(false);
    setEditingIndex(null);
    setCurrentProject({ title: "" });
  };

  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Projects</h3>
          </div>
        </div>

        <div className="space-y-4">
          {/* Saved Projects List */}
          {projects.map((proj, index) => (
            <Card key={index} size="sm" className="bg-muted/10 border-border/40">
              <CardContent className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{proj.title}</h4>
                  {proj.project_url && (
                    <a
                      href={proj.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      {proj.project_url}
                    </a>
                  )}
                  {proj.description && (
                    <p className="text-sm mt-2">{proj.description}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(index)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add Project Form */}
          {isAddingProject ? (
            <div className="p-4 border border-border/40 rounded-3xl space-y-4 bg-muted/5 animate-in fade-in slide-in-from-top-2">
              <Input
                value={currentProject.title}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    title: e.target.value,
                  })
                }
                placeholder="Project Title"
                className="font-medium"
              />
              <Textarea
                value={currentProject.description || ""}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    description: e.target.value,
                  })
                }
                placeholder="Describe your project..."
                rows={2}
                className="resize-none bg-muted/30"
              />
              <Input
                value={currentProject.project_url || ""}
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    project_url: e.target.value,
                  })
                }
                placeholder="Project URL (Optional)"
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={handleCancel}>
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  onClick={saveProject}
                  disabled={!currentProject.title}
                >
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={() => setIsAddingProject(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
