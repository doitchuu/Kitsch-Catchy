import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import Button from "../shared/Button";

import logo from "../../assets/kitsch_catchy_logo.png";
import infoIcon from "../../assets/information_icon.svg";

function Onboarding() {
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();

    navigate("/new");
  }

  function handleOpenModal(event) {
    event.preventDefault();
  }

  return (
    <Wrapper>
      <Section>
        <img src={logo} alt="logo" className="logo" />
        <Button
          onClick={handleClick}
          className="button-filter"
          size="large"
          color="pink"
          type="solid"
        >
          ✨ Make your filter ✨
        </Button>
      </Section>
      <Button
        onClick={handleOpenModal}
        className="button-service"
        size="large"
        color="darkGray"
        type="round"
        icon={infoIcon}
      >
        Peek Into Our World?
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  background-color: #111113;
  background:
    linear-gradient(to bottom, transparent 38px, #1d1d1f 38px) 0 0 / 100vw 40px
      repeat-y,
    linear-gradient(to right, transparent 38px, #1d1d1f 38px) 0 0 / 40px 100vh
      repeat-x #111113;

  .button-service {
    position: fixed;
    right: 48px;
    bottom: 48px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .button-filter {
    width: 340px;
    border: 2px solid #ffffff;
    margin-top: 40px;
  }

  .logo {
    width: 680px;
  }
`;

export default Onboarding;
