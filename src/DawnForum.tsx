import { useEffect, useRef, useState } from "react";
import { axiosWrapper } from "./dawn-ui/util";
import ThreadItem from "./ThreadItem";
import Column from "./dawn-ui/components/Column";
import Thread from "./Thread";
import Content from "./dawn-ui/components/Content";
import Post from "./Post";
import Container from "./dawn-ui/components/Container";
import { Text } from "./dawn-ui";
import Button from "./dawn-ui/components/Button";
import ForumNavbar from "./ForumNavbar";

export interface DawnForumOptions {
  baseUrl: string;
}

export default function DawnForum(options: DawnForumOptions) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [currentThread, setCurrentThread] = useState<number | null>(null);
  const [currentPost, setCurrentPost] = useState<number | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);

    if (params.get("post")) {
      setCurrentPost(parseInt(params.get("post") as string));
      return;
    }

    if (params.get("thread")) {
      setCurrentThread(parseInt(params.get("thread") as string));
      return;
    }

    (async () => {
      try {
        const result = await axiosWrapper(
          "get",
          `${options.baseUrl}/api/threads`
        );
        setThreads(result.data);
      } catch {}
    })();
  }, [options.baseUrl]);

  async function createThread() {
    const title = titleRef.current?.value;

    try {
      const result = await axiosWrapper<"post", Thread>(
        "post",
        `${options.baseUrl}/api/threads`,
        { title }
      );

      window.location.search = `?thread=${result.data.id}`;
    } catch {}
  }

  return (
    <Content>
      {currentPost ? (
        <Post id={currentPost} options={options} />
      ) : currentThread ? (
        <Thread id={currentThread} options={options} />
      ) : (
        <Column style={{ gap: "10px" }}>
          <ForumNavbar options={options} />
          <Container>
            <Text type="heading">Create a thread</Text>
            <table>
              <tbody>
                <tr>
                  <td>Title:</td>
                  <td>
                    <input ref={titleRef} />
                  </td>
                </tr>
              </tbody>
            </table>
            <Button big onClick={createThread}>
              Create
            </Button>
          </Container>
          {threads.map((x) => (
            <ThreadItem thread={x} />
          ))}
        </Column>
      )}
    </Content>
  );
}
