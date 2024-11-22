interface ContentProps {
  contentTitle: string;
  contentText: string;
  courseTitle: string;
}

interface filteredContentProps {
  filteredContent: ContentProps | undefined;
}

const Content = ({ filteredContent }: filteredContentProps) => {
  return (
    <div>
      <h1>{filteredContent?.contentText}</h1>
    </div>
  );
};
export default Content;
