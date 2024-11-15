import Words from "./dawn-ui/components/Words";
import Link from "./dawn-ui/components/Link";
import Row from "./dawn-ui/components/Row";
import { DawnForumOptions } from "./DawnForum";

export default function ForumNavbar({
  options,
}: {
  options: DawnForumOptions;
}) {
  const params = new URLSearchParams(window.location.search);

  const home = <Link href={"/"}>Home</Link>;
  const thread = params.get("thread") ? (
    <Link href={`?thread=${params.get("thread")}`}>
      Thread #{params.get("thread")}
    </Link>
  ) : null;
  const post = params.get("post") ? (
    <Link href={`?thread=${params.get("thread")}&post=${params.get("post")}`}>
      Post #{params.get("post")}
    </Link>
  ) : null;

  return (
    <Row util={["align-center"]} style={{ justifyContent: "space-between" }}>
      <Words type="heading">
        {home} {thread && <>/ {thread}</>} {post && <>/ {post}</>}
      </Words>
      <Row style={{ gap: "10px" }}>
        <Link href="?login">Login</Link>
        <Link href="?register">Register</Link>
      </Row>
    </Row>
  );
}
