import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import Button from "../shared/Button";
import Modal from "../shared/Modal";

import logo from "../../assets/kitsch_catchy_logo.png";
import infoIcon from "../../assets/information_icon.svg";
import serviceImage from "../../assets/service_image.png";

function Onboarding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();

    navigate("/new");
  }

  function handleOpenModal(event) {
    event.preventDefault();

    setIsModalOpen(true);
  }

  return (
    <>
      {isModalOpen && (
        <Modal>
          <ModalContainer>
            <img src={serviceImage} alt="service_image" />
            <h2 className="title">
              Craft Filters, Your Way.
              <br />
              {`Snap Pics That Scream 'You'!`}
            </h2>
            <p className="description">
              At Kitsch & Catchy, add your images or use
              <br />
              rad sticker templates to create your own filter vibes.
              <br />
              Snap, save, and slay!
            </p>
            <Button
              onClick={() => setIsModalOpen(false)}
              size="large"
              color="pink"
              type="solid"
            >
              {`Let's Roll!`}
            </Button>
          </ModalContainer>
        </Modal>
      )}
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
    </>
  );
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;

  color: #ffffff;
  text-align: center;

  img {
    width: 500px;
    margin-bottom: 12px;
  }

  Button {
    width: 360px;
    margin-top: 24px;
  }

  .title {
    margin: 0;
    padding: 0;
  }

  .description {
    font-size: 16px;
    text-align: center;
    line-height: 24px;
    opacity: 0.8;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  background-color: #111113;
  background:
    linear-gradient(to bottom, transparent 58px, #1d1d1f 38px) 0 0 / 100vw 60px
      repeat-y,
    linear-gradient(to right, transparent 58px, #1d1d1f 38px) 0 0 / 60px 100vh
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
