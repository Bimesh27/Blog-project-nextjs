"use client";
import useCourseStore from "@/zustand/useCourseStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

const AdminContent = () => {
  const { getCourse, courses } = useCourseStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      await getCourse();
      setIsLoading(false);
    };
    fetchCourses();
  }, [getCourse]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col border p-4 md:p-6 lg:p-8">
      <h1 className="mb-4 font-semibold text-xl">Content</h1>

      {/* Fixed height container for table */}
      <div className="flex-1 min-h-0 overflow-auto custom-scrollbar">
        <Table className="w-full relative">
          <TableHeader className="sticky top-0 font-semibold z-10">
            <TableRow>
              <TableCell className="w-1/3">Title</TableCell>
              <TableCell className="w-1/6">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="relative">
            {isLoading
              ? // Skeleton loading state with fixed height rows
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="h-16">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                      </TableCell>
                      <TableCell className="h-16 text-right">
                        <div className="flex space-x-4">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              : courses.map((course) => (
                  <TableRow key={course.title} className="h-16">
                    <TableCell className="w-1/3">
                      <div className="truncate">{course.title}</div>
                    </TableCell>

                    <TableCell className="w-1/6 text-right">
                      <div className="space-x-4 flex justify- items-center">
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                          <Link
                            href={`/admin/admin-panel/show-content/${course.title}`}
                            className="text-white"
                          >
                            Show Content
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default AdminContent;
