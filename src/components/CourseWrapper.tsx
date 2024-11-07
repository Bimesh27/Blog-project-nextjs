'use client';

import useCourseStore from "@/zustand/useCourseStore";
import { useEffect } from "react";
import Course from "./Course";

const CourseWrapper = () => {
  const { courses, getCourse } = useCourseStore();
  useEffect(() => {
    const fetchCourse = async () => {
      await getCourse();
    };
    fetchCourse();
  }, []);

  return (
    <div className="w-full flex flex-col">
      {courses &&
        courses.map((course) => <Course course={course} key={course.title} />)}
    </div>
  );
}
export default CourseWrapper