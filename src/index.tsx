import ReactDOM from "react-dom/client";
import App from "./App";
import "./dawn-ui/index";
import AlertManager from "./dawn-ui/components/AlertManager";
import ContextMenuManager from "./dawn-ui/components/ContextMenuManager";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <App />
    <AlertManager />
    <ContextMenuManager />
  </>
);
