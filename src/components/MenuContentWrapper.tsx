"use client";
import TitleMenuBar from "@/components/TitleMenuBar";
import Content from "@/components/Content";
import { useEffect, useState } from "react";
import { useContentStore } from "@/zustand/useContentStore";

interface MenuContentWrapperProps {
  title: string;
}

const MenuContentWrapper = ({ title }: MenuContentWrapperProps) => {
  const { content, getContent } = useContentStore();
  console.log("All content", content);
  const [contentToShow, setContentToShow] = useState<string | undefined>(
    undefined
  );
  console.log("content to show", contentToShow);

  useEffect(() => {
    const fetchContent = async () => {
      await getContent(title);
    };

    fetchContent();
  }, [title, getContent]);

  useEffect(() => {
    if (content && content.length > 0) {
      setContentToShow(content[0].contentTitle);
    }
  }, [content]);

  const filteredContent = content?.find(
    (c) => c.contentTitle === contentToShow
  );

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex">
      <TitleMenuBar
        title={title}
        setContentToShow={setContentToShow}
        content={content}
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
