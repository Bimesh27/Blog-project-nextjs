import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import useCourseStore from "@/zustand/useCourseStore";

interface ShowCourseProps {
  course: {
    title: string;
    description: string;
    codeExample: string;
    show: boolean;
  };
}

const ShowCourse = ({ course }: ShowCourseProps) => {
  const { toggleCourseShow } = useCourseStore();
  const handleSwitchChange = () => {
    try {
      toggleCourseShow(course.title);
      toast({
        description: "Course visibility updated successfully",
      });
    } catch (error) {
      toast({
        description: "Failed to update course visibility" + error,
      });
    }
  };
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Switch id="show" checked={course.show === true} onCheckedChange={handleSwitchChange}/>
        <Label htmlFor="show">Show</Label>
      </div>
    </div>
  );
};
export default ShowCourse;
