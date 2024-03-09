import { Global, css } from "@emotion/react";

const resetStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

function GlobalStyle() {
  return <Global styles={resetStyles} />;
}

export default GlobalStyle;
