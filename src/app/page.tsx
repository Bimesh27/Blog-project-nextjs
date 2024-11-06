import Course from "@/components/Course";

export default function Home() {
  const availableCourse = [
    {
      title: "C",
      description:
        "Learn the basics of C programming language in the most concise way",
      codeExample: `#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}`,
    },
    {
      title: "C++",
      description:
        "Learn the basics of C++ programming language in the most concise way",
      codeExample: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}`,
    },
    {
      title: "Python",
      description:
        "Learn the basics of Python programming language in the most concise way",
      codeExample: `print("Hello, World!")`,
    },
    {
      title: "JavaScript",
      description:
        "Learn the basics of JavaScript programming language in the most concise way",
      codeExample: `console.log("Hello, World!");`,
    },
  ];

  return (
    <div className=" min-h-[calc(100vh-4rem)] w-full justify-center">
      <div>
        <section className="flex w-full items-center flex-col max-sm:items-start gap-4 p-10 ">
          <h1 className="text-7xl font-semibold mt-10 tracking-normal text-wrap sm:text-[8rem] md:text-[9rem] lg:text-[12rem] xl:text-[14rem]">
            Learn to <span className="text-emerald-500">Code.</span>
          </h1>
          <p className="font-semibold md:text-2xl">In the most concise way</p>
        </section>
        <section className="w-full justify-center flex mt-20 flex-col items-center gap-6">
          <h1 className="text-4xl max-sm:text-2xl font-semibold">
            Available <span className="bg-emerald-600 px-2">Course</span>
          </h1>
          <div className="w-full flex flex-col">
            {availableCourse &&
              availableCourse.map((course) => (
                <Course course={course} key={course.title} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
