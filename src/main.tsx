import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./global/actions/initial.ts";

createRoot(document.getElementById("root")!).render(<App />);
