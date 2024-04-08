import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";

import GlobalStyle from "./GlobalStyle";
import Onboarding from "./Onboarding";
import NewFilter from "./NewFilter";
import CameraCapture from "./CameraCapture";

function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    return (
      <MobileWrapper>
        The kitsch catchy service is <br />
        only available on PC web.😥
      </MobileWrapper>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/*" element={<Onboarding />} />
        <Route path="/new" element={<NewFilter />} />
        <Route path="/camera" element={<CameraCapture />} />
      </Routes>
    </>
  );
}

const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  color: #111113;
  font-size: 1rem;
  font-weight: 700;
`;

export default App;
