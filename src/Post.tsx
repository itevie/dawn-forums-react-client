import { useEffect, useState } from "react";
import { Text } from "./dawn-ui";
import { axiosWrapper } from "./dawn-ui/util";
import { DawnForumOptions } from "./DawnForum";
import Container from "./dawn-ui/components/Container";

export default function Post({
  id,
  options,
}: {
  id: number;
  options: DawnForumOptions;
}) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setPost(
          (await axiosWrapper("get", `${options.baseUrl}/api/posts/${id}`)).data
        );
      } catch {}
    })();
  }, [id, options]);

  return !post ? (
    <>Loading...</>
  ) : (
    <>
      <Text type="heading">
        Forum &gt; Thread {post.thread} &gt; Post {post.id}
      </Text>
      <Container>
        <p>{post.body}</p>
      </Container>
    </>
  );
}
