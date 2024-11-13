import { useEffect, useRef, useState } from "react";
import { Text } from "./dawn-ui";
import { axiosWrapper } from "./dawn-ui/util";
import { DawnForumOptions } from "./DawnForum";
import Container from "./dawn-ui/components/Container";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Row from "./dawn-ui/components/Row";
import SideUser from "./User";
import Column from "./dawn-ui/components/Column";
import Button from "./dawn-ui/components/Button";
import DawnComment from "./Comment";
import Comment from "./Comment";
import ForumNavbar from "./ForumNavbar";

export default function Post({
  id,
  options,
}: {
  id: number;
  options: DawnForumOptions;
}) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<DawnComment[]>([]);

  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const post = (
          await axiosWrapper("get", `${options.baseUrl}/api/posts/${id}`)
        ).data;

        setPost(post);

        setComments(
          (
            await axiosWrapper(
              "get",
              `${options.baseUrl}/api/posts/${id}/comments`
            )
          ).data
        );
      } catch {}
    })();
  }, [id, options]);

  async function createComment() {
    const body = bodyRef.current?.value;

    try {
      await axiosWrapper(
        "post",
        `${options.baseUrl}/api/posts/${id}/comments`,
        { body }
      );
      window.location.reload();
    } catch {}
  }

  return !post ? (
    <>Loading...</>
  ) : (
    <Column style={{ gap: "10px" }}>
      <ForumNavbar options={options} />
      <Container>
        <Row style={{ gap: "10px" }}>
          <SideUser util={["no-shrink"]} user={post.author} options={options} />
          <Column>
            <Text type="heading">{post.title}</Text>
            <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
          </Column>
        </Row>
      </Container>
      <Container>
        <Text type="heading">Add a comment</Text>
        <textarea ref={bodyRef} style={{ height: "100px" }}></textarea>
        <Button big onClick={createComment}>
          Post
        </Button>
      </Container>
      {comments.reverse().map((x) => (
        <Comment options={options} comment={x} />
      ))}
    </Column>
  );
}
