"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

interface ContentCredentials {
  contentTitle: string;
  contentText: string;
  courseTitle: string;
}

interface TitleMenuBarProps {
  setContentToShow: React.Dispatch<React.SetStateAction<string | undefined>>;
  content: ContentCredentials[];
  contentToShow?: string;
  title: string;
}

const TitleMenuForSmallScree = ({
  content,
  contentToShow,
  setContentToShow,
  title,
}: TitleMenuBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="md:hidden max-w-[14rem]">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <MenuIcon className="mt-4 ml-2" />
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[14rem]">
          <SheetTitle className="text-green-400 font-semibold">
            {title} course
          </SheetTitle>
          <div className="mt-6 transition-all gap-4 flex flex-col">
            {content &&
              content.map((content) => (
                <div
                  key={content.contentTitle}
                  className={`w-full text-center p-2 cursor-pointer transition-all ${
                    content.contentTitle === contentToShow
                      ? "bg-violet-500"
                      : ""
                  }`}
                >
                  <p
                    onClick={() => {
                      setContentToShow(content.contentTitle);
                      setIsOpen(false);
                    }}
                  >
                    {content.contentTitle}
                  </p>
                </div>
              ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default TitleMenuForSmallScree;
