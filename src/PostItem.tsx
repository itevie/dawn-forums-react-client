import { useEffect, useState } from "react";
import Column from "./dawn-ui/components/Column";
import Container from "./dawn-ui/components/Container";
import Row from "./dawn-ui/components/Row";
import { DawnForumOptions } from "./DawnForum";
import SideUser from "./User";
import { showPostContext } from "./util";
import { axiosWrapper } from "./dawn-ui/util";

export default function PostItem({
  post,
  options,
}: {
  post: Post;
  options: DawnForumOptions;
}) {
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setAuthor(
          (
            await axiosWrapper(
              "get",
              `${options.baseUrl}/api/users/${post.author}`
            )
          ).data
        );
      } catch {}
    })();
  }, [post, options]);

  return (
    <Container
      hover
      onContextMenu={(e) => showPostContext(post, e)}
      onClick={() =>
        (window.location.search = `?thread=${post.thread}&post=${post.id}`)
      }
    >
      <Row style={{ gap: "10px" }}>
        <SideUser user={post.id} options={options} util={["no-shrink"]} />
        <Column>
          <Row util={["align-center"]} style={{ gap: "10px" }}>
            <b>{post.title}</b>
            <small>{post.created_at}</small>
          </Row>
          <p>
            {post.body.substring(0, 500)}
            {post.body.length > 500 ? " ..." : ""}
          </p>
        </Column>
      </Row>
    </Container>
  );
}
