import type { NextPage } from "next";
import Home from "../components/Home/Home";
import useIsomorphicLayoutEffect from "../utils/useIsomorphicLayoutEffect";
import useStore from "../state/store";
import { applyTheme } from "../utils/themeUtils";
import { client } from "../utils/graphql";
import { ApolloProvider } from "@apollo/client";

const App: NextPage = () => {
  const theme = useStore((state) => state.theme);
  useIsomorphicLayoutEffect(() => {
    applyTheme(theme);
  });

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
