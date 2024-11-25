import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ContentProps {
  contentTitle: string;
  contentText: string; // The text may include code blocks
  courseTitle: string;
}

interface FilteredContentProps {
  filteredContent: ContentProps | undefined;
}

const Content = ({ filteredContent }: FilteredContentProps) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

  const renderContent = () => {
    if (!filteredContent?.contentText) {
      return <p>No content available.</p>;
    }

    const splitContent = filteredContent.contentText.split(codeBlockRegex);

    return splitContent.map((part, index) => {
      if (index % 3 === 2) {
        // Code block content
        const language = splitContent[index - 1] || "text"; // Extract language or use 'text' by default
        return (
          <SyntaxHighlighter
            key={index}
            language={language.trim()}
            style={dracula}
          >
            {part.trim()}
          </SyntaxHighlighter>
        );
      } else if (index % 3 === 0) {
        // Regular text content
        return <p key={index}>{part}</p>;
      }
      return null; // Skip language identifiers
    });
  };

  return (
    <div className="content-container">
      <h1 className="content-title">{filteredContent?.contentTitle}</h1>
      <div className="content-text">{renderContent()}</div>
    </div>
  );
};

export default Content;
