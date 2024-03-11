import React from "react";
import styled from "@emotion/styled";

import Modal from "./Modal";
import Button from "./Button";

function Popup({
  title,
  description,
  handleClosePopup,
  handleClick,
  buttonColor,
  buttonText,
}) {
  return (
    <Modal>
      <TextWrapper>
        <h1 className="title">{title}</h1>
        <p className="description">{description}</p>
      </TextWrapper>
      <ButtonWrapper>
        <Button
          onClick={handleClosePopup}
          size="medium"
          color="lightGray"
          type="solid"
        >
          Nope
        </Button>
        <Button
          onClick={handleClick}
          size="medium"
          color={buttonColor}
          type="solid"
        >
          {buttonText}
        </Button>
      </ButtonWrapper>
    </Modal>
  );
}

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: #ffffff;
  text-align: center;

  .title {
    font-size: 1.75rem;
    font-family: "Racing Sans One";
  }

  .description {
    width: 420px;
    margin-bottom: 48px;

    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    line-height: 24px;
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
`;

export default Popup;
