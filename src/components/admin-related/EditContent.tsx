"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { Edit } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { AlertDialogFooter } from "../ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useContentStore } from "@/zustand/useContentStore";

interface ContentCredentials {
  contentTitle: string;
  contentText: string;
  courseTitle: string;
}

interface EditContentProps {
  contentTitle: string;
  contentText: string;
  courseTitle: string;
  contentId: string;
  addContent: (
    credentials: ContentCredentials,
    title: string
  ) => Promise<ContentCredentials | null>;
}

const EditContent = ({
  contentTitle,
  contentText,
  courseTitle,
  contentId,
}: EditContentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCodeMode, setIsCodeMode] = useState<boolean>(false); // Track code mode
  const { editContent } = useContentStore();
  const [formData, setFormData] = useState<ContentCredentials>({
    contentTitle: contentTitle,
    contentText: contentText,
    courseTitle: courseTitle,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Form data", formData);

    const res = await editContent(
      {
        contentTitle: formData.contentTitle,
        contentText: formData.contentText,
        courseTitle: formData.courseTitle,
      },
      courseTitle,
      contentId
    );
    if (res) {
      toast({
        description: "Content updated successfully",
      });
      setIsOpen(false);
    } else {
      toast({
        description: "Failed to update content",
      });
    }
  };

  const toggleCodeMode = () => {
    setIsCodeMode(!isCodeMode);
    // Insert code block markers when entering code mode
    if (!isCodeMode) {
      setFormData((prev) => ({
        ...prev,
        contentText: prev.contentText + "\n```c\n\n```", // Add code block placeholder
      }));
    }
  };

  // Handle Tab key to insert 5 spaces instead of moving focus
  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const { selectionStart, selectionEnd } = textarea;
      const content = formData.contentText;

      // Check if the cursor is inside a code block (between backticks)
      const beforeCursor = content.slice(0, selectionStart);
      const afterCursor = content.slice(selectionEnd);

      const codeBlockRegex = /```c[\s\S]*?```/g;
      const codeBlocks = Array.from(content.matchAll(codeBlockRegex));

      // Determine if the cursor is inside a code block
      const isInsideCodeBlock = codeBlocks.some(
        ([block]) => beforeCursor.includes(block) && afterCursor.includes(block)
      );

      if (isInsideCodeBlock) {
        // Add 5 spaces within the code block
        const updatedContent = beforeCursor + "     " + afterCursor;
        setFormData((prev) => ({
          ...prev,
          contentText: updatedContent,
        }));

        // Adjust cursor to stay after the inserted spaces
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + 5;
        }, 0);
      } else {
        // If not in a code block, behave as normal
        const updatedContent = beforeCursor + "     " + afterCursor;
        setFormData((prev) => ({
          ...prev,
          contentText: updatedContent,
        }));

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + 5;
        }, 0);
      }
    }
  };

  const renderContent = () => {
    const codeBlockRegex = /```c([\s\S]*?)```/g; // Regex to find code blocks
    const splitContent = formData.contentText.split(codeBlockRegex);

    return splitContent.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        return (
          <SyntaxHighlighter key={index} language="c" style={dracula}>
            {part.trim()}
          </SyntaxHighlighter>
        );
      }
      // Otherwise it's regular text
      return <p key={index}>{part}</p>;
    });
  };

  return (
    <div className="text-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Edit or Add <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] flex flex-col justify-center">
          <DialogHeader>
            <DialogTitle>Add or Edit</DialogTitle>
            <DialogDescription>Edit or add the contents</DialogDescription>
          </DialogHeader>
          <div>
            <section className="mb-4">
              <Label htmlFor="contentTitle">Content title</Label>
              <Input
                id="contentTitle"
                defaultValue={formData.contentTitle}
                required
                onChange={handleChange}
              />
            </section>
            <section>
              <Label>Content Text</Label>
              <div className="relative flex gap-4 w-full max-md:flex-col">
                <div className="min-w-[50%]">
                  <Textarea
                    id="contentText"
                    value={formData.contentText}
                    className="min-h-[300px] sm:min-h-[200px] font-mono p-4 max-h-[350px]"
                    required
                    onChange={handleChange}
                    onKeyDown={handleTabKey}
                  />
                  <Button
                    onClick={toggleCodeMode}
                    className="absolute top-2 right-2 text-xs px-2 opacity-75 hover:opacity-100 transition-all rounded-full"
                  >
                    {isCodeMode ? "Exit Code Mode" : "Add Code"}
                  </Button>
                </div>
                <div className="mt-10 md:mt-0 p-4 border text-white w-full min-h-48 max-sm:min-h-56 min-w-[50%] max-h-56 overflow-y-scroll">
                  {renderContent()}
                </div>
              </div>
            </section>
          </div>
          <AlertDialogFooter>
            <Button type="submit" className="text-white" onClick={handleSubmit}>
              Save Changes
            </Button>
          </AlertDialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditContent;
