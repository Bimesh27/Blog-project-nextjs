"use client";

interface ContentCredentials {
  contentTitle: string;
  contentText: string;
  courseTitle: string;
}

interface TitleMenuBarProps {
  title: string;
  setContentToShow: React.Dispatch<React.SetStateAction<string | undefined>>;
  content: ContentCredentials[];
  contentToShow?: string;
}

const TitleMenuBar = ({
  title,
  setContentToShow,
  content,
  contentToShow,
}: TitleMenuBarProps) => {
  return (
    <div className="flex flex-col min-w-60 h-[calc(100vh-4rem)] items-center max-md:hidden">
      <h1 className="my-3 font-semibold text-green-500">{title} Tutorial</h1>
      <div className="flex flex-col gap-3 w-full px-4">
        {content &&
          content.map((content) => (
            <div
              key={content.contentTitle}
              className={`w-full text-center p-2 cursor-pointer transition-all ${
                content.contentTitle === contentToShow ? "bg-violet-400" : ""
              }`}
            >
              <p
                onClick={() => {
                  setContentToShow(content.contentTitle);
                }}
              >
                {content.contentTitle}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default TitleMenuBar;
