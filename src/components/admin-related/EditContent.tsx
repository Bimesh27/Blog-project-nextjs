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

interface EditContentProps {
  contentTitle: string;
  contentText: string;
}

const EditContent = ({ contentTitle, contentText }: EditContentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
              <Label htmlFor="description">Content title</Label>
              <Input id="description" defaultValue={contentTitle} required />
            </section>

            <section>
              <Label>Content Text</Label>

              <div className="relative">
                <Textarea
                  id="codeExample"
                  value={contentText}
                  className="min-h-[300px] sm:min-h-[200px] font-mono p-4 max-h-[350px]"
                  required
                />
              </div>
            </section>
          </div>
          <AlertDialogFooter>
            <Button type="submit" className="text-white">
              Save Changes
            </Button>
          </AlertDialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditContent;
