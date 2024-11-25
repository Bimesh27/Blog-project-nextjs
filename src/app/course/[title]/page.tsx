import MenuContentWrapper from "@/components/MenuContentWrapper";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  
  return (
    <div className="flex">
      <MenuContentWrapper title={title}/>
    </div>
  );
}
