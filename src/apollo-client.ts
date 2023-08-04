import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { supabaseUrl } from "./supabase-client";

interface Token {
  access_token: string;
}

interface Headers {
  [key: string]: string;
}

const { VITE_SUPABASE_ENVIRONMENT } = import.meta.env;
const isDevEnv = VITE_SUPABASE_ENVIRONMENT === "development";
const httpLink = createHttpLink({ uri: `${supabaseUrl}/graphql/v1` });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(
    isDevEnv ? "sb-localhost-auth-token" : "sb-access-token"
  );
  const parsedToken = token ? (JSON.parse(token) as Token) : null;
  const accessToken = parsedToken?.access_token || null;

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    } as Headers,
  };
});

export function createApolloClient() {
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: isDevEnv,
  });

  return client;
}
