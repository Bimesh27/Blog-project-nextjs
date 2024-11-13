import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import useCourseStore from "@/zustand/useCourseStore";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface DeleteCourseProps {
  course: {
    title: string;
    description: string;
    codeExample: string;
  };
}

const DeleteCourse = ({ course }: DeleteCourseProps) => {
  const { deleteCourse } = useCourseStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteCourse(course.title);
      toast({
        description: "Course deleted successfully",
      });
    } catch (error) {
      toast({
        description: "Failed to delete course" + error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          aria-label="Delete course"
          className="bg-red-500 hover:bg-red-600"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently the course.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteCourse;
