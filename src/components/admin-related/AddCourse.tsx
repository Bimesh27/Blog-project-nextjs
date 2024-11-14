import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { AlertDialogFooter } from "../ui/alert-dialog";
import useCourseStore from "@/zustand/useCourseStore";
import { toast } from "@/hooks/use-toast";

const AddCourse = () => {
  const { addCourse } = useCourseStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    codeExample: "",
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
      const res = await addCourse({
        title: formData.title,
        description: formData.description,
        codeExample: formData.codeExample,
      });
      if (res) {
        toast({
          description: "Course Created successfully",
        });
        setIsOpen(false);
      } else {
        toast({
          description: "Failed to Create course",
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
    <div className="text-center my-20">
      <h1 className="m-2 font-semibold">Manage your courses</h1>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Add Course
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px] flex flex-col justify-center">
          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
            <DialogDescription>
              Add the title, description and code example of the course
            </DialogDescription>
          </DialogHeader>
          <div>
            <section className="mb-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                defaultValue={formData.title}
                onChange={handleChange}
                required
              />

              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                defaultValue={formData.description}
                onChange={handleChange}
                required
              />
            </section>

            <section>
              <Label>Code Example</Label>

              <div className="relative">
                <Textarea
                  id="codeExample"
                  value={formData.codeExample}
                  onChange={handleChange}
                  className="min-h-[300px] sm:min-h-[200px] font-mono p-4 max-h-[350px]"
                  required
                />
              </div>
            </section>
          </div>
          <AlertDialogFooter>
            <Button type="submit" onClick={handleSubmit} className="text-white">
              {isLoading ? "Adding..." : "Add Course"}
            </Button>
          </AlertDialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddCourse;
