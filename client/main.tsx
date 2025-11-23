import "./global.css";

import { createRoot, Root } from "react-dom/client";
import App from "./App";

let root: Root | null = null;

function render() {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  if (!root) {
    root = createRoot(rootElement);
  }
  root.render(<App />);
}

render();

if (import.meta.hot) {
  import.meta.hot.accept("./App", () => {
    render();
  });
}
