"use client";
import useCourseStore from "@/zustand/useCourseStore";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import LoadingDots from "../LoadingDots";

const AdminCourse = () => {
  const { courses, getCourse } = useCourseStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      await getCourse();
      setIsLoading(false);
    };
    fetchCourses();
  }, [getCourse]);

  return (
    <div className="h-[calc(100vh-4rem)] border p-4 md:p-6 lg:p-8">
      <h1 className="mb-4 font-semibold text-xl">Courses</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingDots />
        </div>
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableCell className="truncate">Title</TableCell>
              <TableCell className="truncate">Description</TableCell>
              <TableCell className="text-right">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.title}>
                <TableCell className="truncate">{course.title}</TableCell>
                <TableCell className="truncate">{course.description}</TableCell>
                <TableCell className="text-right">
                  <div className="space-x-4 flex justify-end">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminCourse;
