"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { Edit } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { AlertDialogFooter } from "../ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface ContentCredentials {
  contentTitle: string;
  contentText: string;
  courseTitle: string;
}

interface EditContentProps {
  contentTitle: string;
  contentText: string;
  courseTitle: string;
  addContent: (
    credentials: ContentCredentials,
    title: string
  ) => Promise<ContentCredentials | null>;
}

const EditContent = ({
  contentTitle,
  contentText,
  courseTitle,
  addContent,
}: EditContentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContentCredentials>({
    contentTitle: contentTitle,
    contentText: contentText,
    courseTitle: courseTitle,
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

  const handleSubmit = () => {
    console.log(formData);
    toast({
      description: "Content change successfully",
    });
  };

  return (
    <div className="text-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Edit or Add <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px] flex flex-col justify-center">
          <DialogHeader>
            <DialogTitle>Add or Edit</DialogTitle>
            <DialogDescription>Edit or add the contents</DialogDescription>
          </DialogHeader>
          <div>
            <section className="mb-4">
              <Label htmlFor="contentTitle">Content title</Label>
              <Input
                id="contentTitle"
                defaultValue={formData.contentTitle}
                required
                onChange={handleChange}
              />
            </section>

            <section>
              <Label>Content Text</Label>

              <div className="relative">
                <Textarea
                  id="contentText"
                  value={formData.contentText}
                  className="min-h-[300px] sm:min-h-[200px] font-mono p-4 max-h-[350px]"
                  required
                  onChange={handleChange}
                />
              </div>
            </section>
          </div>
          <AlertDialogFooter>
            <Button type="submit" className="text-white" onClick={handleSubmit}>
              Save Changes
            </Button>
          </AlertDialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditContent;
