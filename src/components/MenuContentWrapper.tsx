"use client";
import TitleMenuBar from "@/components/TitleMenuBar";
import Content from "@/components/Content";
import { useEffect, useState } from "react";
import { useContentStore } from "@/zustand/useContentStore";

interface MenuContentWrapperProps {
  title: string;
}

const MenuContentWrapper = ({ title }: MenuContentWrapperProps) => {
  const { content, getContent, getContentByTitle, specificContent } =
    useContentStore();
  console.log("All content", content);
  const [contentToShow, setContentToShow] = useState<string>(
    content?.[0]?.contentTitle
  );
  console.log("content to show", contentToShow);
  console.log("Specific content", specificContent);
  

  useEffect(() => {
    const fetchContent = async () => {
      await getContent(title);
      await getContentByTitle(title, contentToShow);
    };

    fetchContent();
  }, [title, getContent]);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex">
      <TitleMenuBar
        title={title}
        setContentToShow={setContentToShow}
        content={content}
      />
      <Content specificContent={specificContent} />
      {/* Ill pass the content later after i fix the bug hehe*/}
    </div>
  );
};
export default MenuContentWrapper;
