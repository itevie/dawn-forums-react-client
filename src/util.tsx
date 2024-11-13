import { showContextMenu } from "./dawn-ui/components/ContextMenuManager";

export function showPostContext(
  post: Post,
  e: React.MouseEvent<any, MouseEvent>
) {
  showContextMenu({
    event: e,
    elements: [
      {
        type: "button",
        label: "Copy Body",
        onClick: () => {
          window.navigator.clipboard.writeText(post.body);
        },
      },
      {
        type: "seperator",
      },
      {
        type: "button",
        label: "Delete",
        onClick: () => {
          alert("delete" + post);
        },
      },
    ],
  });
}
