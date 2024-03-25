import { Global, css } from "@emotion/react";

const resetStyles = css`
  body {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

function GlobalStyle() {
  return <Global styles={resetStyles} />;
}

export default GlobalStyle;
