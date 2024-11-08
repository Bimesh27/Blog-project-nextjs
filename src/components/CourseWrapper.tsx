"use client";

import useCourseStore from "@/zustand/useCourseStore";
import { useEffect } from "react";
import Course from "./Course";
import ThreeDotLoading from "./ThreeDotLoading";

const CourseWrapper = () => {
  const { courses, getCourse, loading } = useCourseStore();

  useEffect(() => {
    const fetchCourse = async () => {
      await getCourse();
    };
    fetchCourse();
  }, [getCourse]);

  if (!loading) {
    return (
      <div className="h-[calc(100vh-50vh)] w-full flex justify-center items-center">
        <ThreeDotLoading />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-w-80">
      {courses &&
        courses.map((course) => <Course course={course} key={course.title} />)}
    </div>
  );
};
export default CourseWrapper;
