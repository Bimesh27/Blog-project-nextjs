interface Course {
  title: string;
  description: string;
}

interface CourseProps {
  course: Course;
}

const Course = ({ course }: CourseProps) => {
  return (
    <div className="flex w-full items-center min-h-72 border border-[#fafafa2f] flex-col text-wrap p-12">
      <h1 className="text-4xl font-bold mt-10">{course.title}</h1>
      <p className="text-center">{course.description}</p>
    </div>
  );
};
export default Course;
