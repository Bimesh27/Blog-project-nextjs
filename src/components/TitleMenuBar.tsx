"use client";

interface ContentCredentials {
  contentTitle: string;
  contentText: string;
  courseTitle: string;
}

interface TitleMenuBarProps {
  title: string;
  setContentToShow: React.Dispatch<React.SetStateAction<string >>;
  content: ContentCredentials[];
}

const TitleMenuBar = ({ title, setContentToShow, content }: TitleMenuBarProps) => {

  return (
    <div className="flex flex-col border min-w-60 h-[calc(100vh-4rem)] items-center ">
      <h1 className="mt-2">{title} Tutorial</h1>
      {content &&
        content.map((content) => (
          <div
            key={content.contentTitle}
            className="hover:bg-gray-200 dark:hover:bg-gray-900 w-full text-center p-2 cursor-pointer"
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
  );
};
export default TitleMenuBar;
