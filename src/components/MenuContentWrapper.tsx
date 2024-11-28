"use client";
import TitleMenuBar from "@/components/TitleMenuBar";
import Content from "@/components/Content";
import { useEffect, useState } from "react";
import { useContentStore } from "@/zustand/useContentStore";
import TitleMenuForSmallScree from "./TitleMenuForSmallScree";
import LoadingDots from "./LoadingDots";

interface MenuContentWrapperProps {
  title: string;
}

const MenuContentWrapper = ({ title }: MenuContentWrapperProps) => {
  const { content, getContent } = useContentStore();
  const [loading, setLoading] = useState<boolean>(true);
  console.log("All content", content);
  const [contentToShow, setContentToShow] = useState<string | undefined>(
    undefined
  );
  console.log("content to show", contentToShow);

  useEffect(() => {
    setLoading(true);
    const fetchContent = async () => {
      await getContent(title);
    };

    fetchContent();
    setLoading(false);
  }, [title, getContent]);

  useEffect(() => {
    if (content && content.length > 0) {
      setContentToShow(content[0].contentTitle);
    }
  }, [content]);

  const filteredContent = content?.find(
    (c) => c.contentTitle === contentToShow
  );

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center w-full">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex">
      <TitleMenuBar
        title={title}
        setContentToShow={setContentToShow}
        content={content}
        contentToShow={contentToShow}
      />
      <TitleMenuForSmallScree
        setContentToShow={setContentToShow}
        content={content}
        contentToShow={contentToShow}
        title={title}
      />
      {filteredContent && (
        <Content
          filteredContent={filteredContent}
          key={filteredContent?.contentTitle}
        />
      )}
    </div>
  );
};
export default MenuContentWrapper;
