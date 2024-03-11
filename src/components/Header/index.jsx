import React, { useState } from "react";
import styled from "@emotion/styled";

import Button from "../shared/Button";
import Popup from "../shared/Popup";

function Header() {
  const [filterName, setFilterName] = useState("");
  const [isOpenedSaveFilterPopup, setIsOpenedSaveFilterPopup] = useState(false);
  const [isOpenedClearPopup, setIsOpenedClearPopup] = useState(false);

  function handleClosePopup(event) {
    event.preventDefault();

    setIsOpenedSaveFilterPopup(false);
    setIsOpenedClearPopup(false);
  }

  function handleSaveFilter(event) {
    event.preventDefault();

    setIsOpenedSaveFilterPopup(false);
  }

  function handleClearStickers(event) {
    event.preventDefault();

    setIsOpenedClearPopup(false);
  }

  return (
    <>
      {isOpenedClearPopup && (
        <Popup
          handleClosePopup={handleClosePopup}
          handleClick={handleClearStickers}
          buttonColor="red"
          buttonText="Clear All"
          title="Going to Clear All the Stickers?"
          description="Hit 'Clear' and Poof! All Stickers Gone!
          Wipe the Slate Clean? Sure You're Cool with That?"
        />
      )}
      {isOpenedSaveFilterPopup && (
        <Popup
          handleClosePopup={handleClosePopup}
          handleClick={handleSaveFilter}
          buttonColor="pink"
          buttonText="Love It! 🖤"
          title="Save your Filter & Snap ?"
          description="Keep the Filter You Made, and Dive Right Into Photo Fun!"
        />
      )}
      <HeaderWrapper>
        <input
          type="text"
          value={filterName}
          maxLength="20"
          onChange={(event) => setFilterName(event.target.value)}
          placeholder="Input your filter name (Max 20 Characters)"
        />
        <ButtonContainer>
          <p
            role="presentation"
            className="button-clear"
            onClick={() => setIsOpenedClearPopup(true)}
          >
            Clear all stickers
          </p>
          <Button
            onClick={() => setIsOpenedSaveFilterPopup(true)}
            size="small"
            color="gradient"
            type="solid"
          >
            Filter Ready & Snap 📸
          </Button>
        </ButtonContainer>
      </HeaderWrapper>
    </>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 40px;

  background-color: #4b4b4b;

  input {
    width: 50%;
    padding: 0px 8px;
    background: none;
    border: none;
    outline: none;

    color: #ffffff;
    font-size: 18px;
    font-weight: 800;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 255, 0.4);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .button-clear {
    margin-right: 24px;

    color: #ffffff;
    font-family: "Racing Sans One", sans-serif;
    font-size: 15px;
    text-decoration: underline;
  }
`;

export default Header;
