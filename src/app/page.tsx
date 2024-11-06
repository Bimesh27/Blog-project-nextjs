import Course from "@/components/Course";

export default function Home() {
  const availabelCourse = [
    {
      title: "C",
      description:
        "Learn the basic of C programming language in the most concise way",
    },
    {
      title: "C++",
      description:
        "Learn the basic of C++ programming language in the most concise way",
    },
    {
      title: "Python",
      description:
        "Learn the basic of Python programming language in the most concise way",
    },
    {
      title: "JavaScript",
      description:
        "Learn the basic of JavaScript programming language in the most concise way",
    },
  ];

  return (
    <div className=" min-h-[calc(100vh-4rem)] w-full justify-center">
      <div>
        <section className="flex w-full items-center flex-col max-sm:items-start gap-4 p-10 md:p-0">
          <h1 className="text-7xl font-bold mt-10 tracking-normal text-wrap">
            Learn to <span className="text-emerald-500">Code.</span>
          </h1>
          <p className="font-semibold ">In the most concise way</p>
          <h1 className="text-4xl max-sm:text-2xl font-semibold">
            Available Course
          </h1>
        </section>
        <section className="w-full justify-center flex mt-20 flex-col items-center gap-6">
          <div className="w-full flex flex-col">
            {availabelCourse && availabelCourse.map((course, index) => (
              <Course course={course} key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
