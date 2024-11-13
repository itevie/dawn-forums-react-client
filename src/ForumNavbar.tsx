import { Text } from "./dawn-ui";
import Link from "./dawn-ui/components/Link";
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
    <Text type="heading">
      {home} {thread && <>/ {thread}</>} {post && <>/ {post}</>}
    </Text>
  );
}
