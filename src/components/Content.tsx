interface ContentCredentials {
  contentTitle: string;
  contentText: string;
  courseTitle: string;
}
const Content = ({ specificContent }: ContentCredentials) => {
  return (
    <div>
      <p>{specificContent.contentText}</p>
    </div>
  );
};
export default Content;
