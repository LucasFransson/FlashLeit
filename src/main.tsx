import ReactDOM from "react-dom/client";
import { PublicClientApplication } from "@azure/msal-browser";
import App from "./App.tsx";
import { msalConfig } from "./configs/msalConfig";
import "./index.css";

const msalInstance = new PublicClientApplication(msalConfig);

{
	ReactDOM.createRoot(document.getElementById("root")!).render(<App instance={msalInstance} />);
}
