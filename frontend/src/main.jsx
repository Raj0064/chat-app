import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/theme-provider";
import { ChatProvider } from "./context/ChatContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <ChatProvider>
    <ThemeProvider defaultTheme="system">
        <AuthProvider>
      <App />
        </AuthProvider>
    </ThemeProvider>
      </ChatProvider>
  
  </React.StrictMode>
);