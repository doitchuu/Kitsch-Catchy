import { Global, css } from "@emotion/react";

const resetStyles = css`
  body {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
`;

function GlobalStyle() {
  return <Global styles={resetStyles} />;
}

export default GlobalStyle;
