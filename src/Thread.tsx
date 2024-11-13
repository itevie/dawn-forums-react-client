import { useEffect, useRef, useState } from "react";
import { Text } from "./dawn-ui";
import { axiosWrapper } from "./dawn-ui/util";
import { DawnForumOptions } from "./DawnForum";
import Column from "./dawn-ui/components/Column";
import PostItem from "./PostItem";
import Container from "./dawn-ui/components/Container";
import Button from "./dawn-ui/components/Button";
import ForumNavbar from "./ForumNavbar";

export default function Thread({
  id,
  options,
}: {
  id: number;
  options: DawnForumOptions;
}) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    (async () => {
      try {
        setThread(
          (
            await axiosWrapper<"get", Thread>(
              "get",
              `${options.baseUrl}/api/threads/${id}`
            )
          ).data
        );
        setPosts(
          (
            await axiosWrapper<"get", Post[]>(
              "get",
              `${options.baseUrl}/api/threads/${id}/posts`
            )
          ).data.reverse()
        );
      } catch {}
    })();
  }, [id, options]);

  async function post() {
    try {
      let title = titleRef.current?.value;
      let body = bodyRef.current?.value;

      const result = await axiosWrapper<"post", Post>(
        "post",
        `${options.baseUrl}/api/threads/${id}/posts`,
        { title, body }
      );

      window.location.search = `?thread=${result.data.thread}&post=${result.data.id}`;
    } catch {}
  }

  return !thread ? (
    <>Loading...</>
  ) : (
    <Column style={{ gap: "10px" }}>
      <ForumNavbar options={options} />
      <Column style={{ gap: "10px" }}>
        <Container>
          <Column>
            <Text type="heading">Create a post</Text>
            <table>
              <tbody>
                <tr>
                  <td>Title</td>
                  <td>
                    <input ref={titleRef} />
                  </td>
                </tr>
                <tr>
                  <td>Body</td>
                  <td>
                    <textarea ref={bodyRef} />
                  </td>
                </tr>
              </tbody>
            </table>
            <Button big onClick={post}>
              Post
            </Button>
          </Column>
        </Container>
        {posts.map((x) => (
          <PostItem post={x} options={options} />
        ))}
      </Column>
    </Column>
  );
}
