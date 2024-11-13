import { useEffect, useState } from "react";
import Column from "./dawn-ui/components/Column";
import GoogleMatieralIcon from "./dawn-ui/components/GoogleMaterialIcon";
import Icon from "./dawn-ui/components/Icon";
import { axiosWrapper, UtilClassNames } from "./dawn-ui/util";
import { DawnForumOptions } from "./DawnForum";

const userCache: { [key: number]: User } = {};

export default function SideUser({
  user: u,
  util,
  options,
}: {
  user: number | null;
  util?: UtilClassNames[];
  options: DawnForumOptions;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!u) return;
    if (userCache[u]) setUser(userCache[u]);
    (async () => {
      try {
        const user = (
          await axiosWrapper<"get", User>(
            "get",
            `${options.baseUrl}/api/users/${u}`
          )
        ).data;
        userCache[u] = user;
        setUser(user);
      } catch {}
    })();
  }, [u, options]);

  return (
    <Column util={util}>
      {user?.avatar ? (
        <Icon src={user.avatar} size="128px" />
      ) : (
        <GoogleMatieralIcon
          style={{ fontSize: "96px" }}
          name="account_circle"
        />
      )}
      <b style={{ textAlign: "center" }}>{user?.username}</b>
    </Column>
  );
}
