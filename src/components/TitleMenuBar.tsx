"use client";

import { useContentStore } from "@/zustand/useContentStore";
import { useEffect } from "react";


interface TitleMenuBarProps {
  title: string;
}

const TitleMenuBar = ({ title }: TitleMenuBarProps) => {
  const { content, getContent } = useContentStore();
  console.log("All content", content);

  useEffect(() => {
    const fetchContent = async () => {
      await getContent(title);
    };

    fetchContent();
  }, [title, getContent]);

  return (
    <div className="flex flex-col border min-w-60 h-[calc(100vh-4rem)] items-center ">
      <h1 className="mt-2">{title} Tutorial</h1>
      {content &&
        content.map((content) => (
          <div
            key={content.contentTitle}
            className="hover:bg-gray-200 dark:hover:bg-gray-900 w-full text-center p-2 cursor-pointer"
          >
            <p>{content.contentTitle}</p>
          </div>
        ))}
    </div>
  );
};
export default TitleMenuBar;
