import TitleMenuBar from "@/components/TitleMenuBar";
import Content from "@/components/ui/Content";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;

  return (
    <div className="flex">
      <TitleMenuBar title={title} />
      <Content />
    </div>
  );
}
