"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Label } from "../ui/label";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Textarea } from "../ui/textarea";
import useCourseStore from "@/zustand/useCourseStore";
import { toast } from "@/hooks/use-toast";

interface EditCourseProps {
  course: {
    title: string;
    description: string;
    codeExample: string;
  };
}

const EditCourse = ({ course }: EditCourseProps) => {
  const { updateCourse } = useCourseStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    codeExample: course.codeExample,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { title, description, codeExample } = formData;
      const res = await updateCourse({
        title,
        description,
        codeExample,
      });
      if (res) {
        toast({
          description: "Course updated successfully",
        });
        setIsOpen(false);
      } else {
        toast({
          description: "Failed to update course",
        });
      }
    } catch (error) {
      toast({
        description: "Something went wrong" + error,
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Edit className="bg-transparent" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px] flex flex-col justify-center">
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
            <DialogDescription>
              Make changes to the course details below.
            </DialogDescription>
          </DialogHeader>
          <div>
            <section className="mb-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                defaultValue={formData.title}
                onChange={handleChange}
              />

              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                defaultValue={formData.description}
                onChange={handleChange}
              />
            </section>

            <section>
              <Label>Code Example</Label>
              {isEditing ? (
                <div className="relative">
                  <Textarea
                    id="codeExample"
                    value={formData.codeExample}
                    onChange={handleChange}
                    className="min-h-[300px] sm:min-h-[200px] font-mono p-4 max-h-[350px]"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Preview
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <div className="rounded-md overflow-hidden">
                    <SyntaxHighlighter
                      language={formData.title
                        .toLowerCase()
                        .replace("++", "pp")}
                      style={tomorrow}
                      showLineNumbers
                      className="min-h-[250px] min-w-[300px] sm:w-[400px]"
                      customStyle={{ margin: 0 }}
                    >
                      {formData.codeExample}
                    </SyntaxHighlighter>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </section>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditCourse;
