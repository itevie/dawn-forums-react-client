import Markdown from "react-markdown";
import Row from "./dawn-ui/components/Row";
import { DawnForumOptions } from "./DawnForum";
import SideUser from "./User";
import remarkGfm from "remark-gfm";
import Container from "./dawn-ui/components/Container";
import Column from "./dawn-ui/components/Column";

export default function Comment({
  comment,
  options,
}: {
  comment: DawnComment;
  options: DawnForumOptions;
}) {
  return (
    <Container>
      <Row style={{ gap: "10px" }}>
        <SideUser
          util={["no-shrink"]}
          user={comment.author}
          options={options}
        ></SideUser>
        <Column>
          <Markdown remarkPlugins={[remarkGfm]}>{comment.body}</Markdown>
          <small>Commented at {comment.created_at}</small>
        </Column>
      </Row>
    </Container>
  );
}
