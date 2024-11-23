import ContentWrapper from "@/components/admin-related/ContentWrapper";

export default async function ContentPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const {title} = await params;

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center">
      {title && <ContentWrapper title={title} />}
    </div>
  );
}
