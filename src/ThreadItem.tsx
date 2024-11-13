import Column from "./dawn-ui/components/Column";
import Container from "./dawn-ui/components/Container";
import Row from "./dawn-ui/components/Row";

export default function ThreadItem({ thread }: { thread: Thread }) {
  return (
    <Container
      hover
      onClick={() => (window.location.search = `?thread=${thread.id}`)}
    >
      <Column>
        <Row util={["align-center"]} style={{ gap: "10px" }}>
          <b>{thread.name}</b>
          <small>{thread.created_at}</small>
        </Row>
      </Column>
    </Container>
  );
}
