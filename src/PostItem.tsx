import Column from "./dawn-ui/components/Column";
import Container from "./dawn-ui/components/Container";
import Row from "./dawn-ui/components/Row";

export default function PostItem({ post }: { post: Post }) {
  return (
    <Container
      onClick={() =>
        (window.location.search = `?thread=${post.thread}&post=${post.id}`)
      }
    >
      <Column>
        <Row>
          <b>{post.title}</b>
          <small>{post.created_at}</small>
        </Row>
        <p>{post.body}</p>
      </Column>
    </Container>
  );
}
