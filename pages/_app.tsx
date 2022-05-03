import "../styles/globals.css";
import type { AppProps } from "next/app";
import PageTemplate from "../components/page-template";

function App({ Component, pageProps }: AppProps) {
  return (
    <PageTemplate {...pageProps}>
      <Component {...pageProps} />
    </PageTemplate>
  );
}

export default App;
