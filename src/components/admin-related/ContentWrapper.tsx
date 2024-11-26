"use client";
import { useContentStore } from "@/zustand/useContentStore";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import EditContent from "./EditContent";
import AddContent from "./AddContent";

const ContentWrapper = ({ title }: { title: string }) => {
  const { getContent, content, addContent } = useContentStore(); // use addContent later
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      await getContent(title);
      setIsLoading(false);
    };

    fetchContent();
  }, [title, getContent]);

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="h-full flex flex-col p-4 md:p-6 lg:p-8 w-full ">
        <h1 className="mb-4 font-bold text-xl">{title} Content</h1>
        {/* Fixed height container for table */}
        <div className="flex-1 min-h-0 overflow-auto custom-scrollbar">
          <Table className="w-full relative">
            <TableHeader className="sticky top-0 font-semibold z-10">
              <TableRow className="text-lg text-emerald-500">
                <TableCell className="w-1/3">ContenText</TableCell>
                <TableCell className="w-1/2">Contents</TableCell>
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
                        <TableCell className="h-16">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                        </TableCell>
                        <TableCell className="h-16 text-right">
                          <div className="flex justify-end space-x-4">
                            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                : content.map((c) => (
                    <TableRow key={c.contentTitle} className="h-16">
                      <TableCell className="w-1/3">
                        <div className="truncate">{c.contentTitle}</div>
                      </TableCell>
                      <TableCell className="w-1/2">
                        <div className="truncate">{c.contentText}</div>
                      </TableCell>
                      <TableCell className="w-1/6 text-right">
                        <div className="space-x-4 flex justify- items-center">
                          <EditContent
                            contentTitle={c.contentTitle}
                            contentText={c.contentText}
                            courseTitle={title}
                            contentId={c._id as string}
                            addContent={addContent}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <AddContent title={title}/>
    </div>
  );
};
export default ContentWrapper;
