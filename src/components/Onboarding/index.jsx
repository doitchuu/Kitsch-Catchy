import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import logo from "../../assets/kitsch_catchy_logo.png";
import infoIcon from "../../assets/information_icon.svg";

function Onboarding() {
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();

    navigate("/new");
  }

  return (
    <Wrapper>
      <section>
        <img src={logo} alt="logo" />
        <button onClick={handleClick}>✨ Make your filter ✨</button>
      </section>
      <button>
        <img src={infoIcon} alt="Information Icon" />
        Peek Into Our World?
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

export default Onboarding;
