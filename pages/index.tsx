import type { NextPage } from "next";
import Home from "../components/Home/Home";
import useIsomorphicLayoutEffect from "../utils/useIsomorphicLayoutEffect";
import useStore from "../state/store";
import { applyTheme } from "../utils/themeUtils";

const App: NextPage = () => {
  const theme = useStore((state) => state.theme);
  useIsomorphicLayoutEffect(() => {
    applyTheme(theme);
  });

  return <Home />;
};

export default App;
