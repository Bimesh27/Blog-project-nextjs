import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Course {
  title: string;
  description: string;
  codeExample: string;
}

interface CourseProps {
  course: Course;
}

const Course = ({ course }: CourseProps) => {
  return (
    <div className="flex w-full min-h-80 border border-[#e8e7e7] dark:border-[#fafafa2f] text-wrap p-8 justify-center max-md:flex-col max-md:items-center items-center">
      <section className="w-full sm:w-[50%] flex flex-col items-center gap-3">
        <div className="w-full text-center md:w-[50%] flex flex-col items-center gap-2">
          <h1 className="text-5xl font-bold">{course.title}</h1>
          <p className="text-center text-wrap">{course.description}</p>
        </div>
        <Link
          href={`/learn/${course.title.toLowerCase().replace("++", "pp")}`}
          className="bg-emerald-500 dark:bg-emerald-600 rounded-full px-8 py-2.5 font-semibold"
        >
          Learn {course.title}
        </Link>
      </section>
      <section className="max-sm:hidden w-[50%] flex flex-col items-center gap-2">
        <h1>{course.title} Example:</h1>
        <div className="min-w-96">
          <SyntaxHighlighter
            style={oneDark}
            language={course.title.toLowerCase().replace("++", "pp")}
          >
            {course.codeExample}
          </SyntaxHighlighter>
        </div>
      </section>
    </div>
  );
};
export default Course;
