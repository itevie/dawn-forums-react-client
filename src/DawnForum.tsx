import { useEffect, useState } from "react";
import { axiosWrapper } from "./dawn-ui/util";
import ThreadItem from "./ThreadItem";
import Column from "./dawn-ui/components/Column";
import Thread from "./Thread";
import Content from "./dawn-ui/components/Content";
import Post from "./Post";

export interface DawnForumOptions {
  baseUrl: string;
}

export default function DawnForum(options: DawnForumOptions) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [currentThread, setCurrentThread] = useState<number | null>(null);
  const [currentPost, setCurrentPost] = useState<number | null>(null);

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

  return (
    <Content>
      {currentPost ? (
        <Post id={currentPost} options={options} />
      ) : currentThread ? (
        <Thread id={currentThread} options={options} />
      ) : (
        <Column style={{ gap: "10px" }}>
          {threads.map((x) => (
            <ThreadItem thread={x} />
          ))}
        </Column>
      )}
    </Content>
  );
}
