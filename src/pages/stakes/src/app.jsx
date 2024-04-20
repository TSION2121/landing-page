/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import {useScrollToTop} from "./hooks/use-scroll-to-top";
import ThemeProvider from "./theme";
import Router from "./routes/sections";



// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
