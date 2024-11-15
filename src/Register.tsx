import Button from "./dawn-ui/components/Button";
import Container from "./dawn-ui/components/Container";
import { DawnForumOptions } from "./DawnForum";
import ForumNavbar from "./ForumNavbar";

export default function Register({ options }: { options: DawnForumOptions }) {
  return (
    <>
      <ForumNavbar options={options} />
      <Container title="Register">
        <p>
          Create an account for this forum to create threads, post within them,
          and comment on posts.
        </p>
        <table>
          <tbody>
            <tr>
              <td>Username</td>
              <td>
                <input />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input type="password" />
              </td>
            </tr>
          </tbody>
        </table>
        <Button big>Create Account</Button>
      </Container>
    </>
  );
}
