import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "./apollo-client";
import App from "./App.tsx";
import { SessionContext } from "./context/SessionContext.ts";
import { useSession } from "./hooks/use-session.ts";

const apolloClient = createApolloClient();

export function Root() {
  const session = useSession();
  return (
    <SessionContext.Provider value={session}>
      <ApolloProvider client={apolloClient}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ApolloProvider>
    </SessionContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
