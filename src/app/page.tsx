import CourseWrapper from "@/components/CourseWrapper";

export default function Home() {
  
  return (
    <div className=" min-h-[calc(100vh-4rem)] w-full justify-center">
      <div>
        <section className="flex w-fit flex-col max-sm:items-start gap-4 p-10 ">
          <h1 className="text-7xl font-semibold mt-10 tracking-normal text-wrap sm:text-[8rem] md:text-[9rem] lg:text-[12rem] transition-all">
            Learn to <br />
            <span className="text-emerald-500">Code.</span>
          </h1>
          <p className="font-semibold md:text-2xl">In the most concise way</p>
        </section>
        <section className="w-full justify-center flex mt-20 flex-col items-center gap-6">
          <h1 className="text-4xl max-sm:text-2xl font-semibold">
            Available{" "}
            <span className="bg-emerald-500 dark:bg-emerald-600 px-2">
              Course
            </span>
          </h1>
          <CourseWrapper />
        </section>
      </div>
    </div>
  );
}
