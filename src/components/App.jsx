import React from "react";
import { Route, Routes } from "react-router-dom";

import GlobalStyle from "./GlobalStyle";
import Onboarding from "./Onboarding";
import NewFilter from "./NewFilter";
import CameraCapture from "./CameraCapture";

function App() {
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

export default App;
