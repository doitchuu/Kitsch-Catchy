import React, { useState } from "react";
import styled from "@emotion/styled";

import Button from "../shared/Button";

function Header({ onSaveFilter }) {
  const [filterName, setFilterName] = useState("");

  return (
    <HeaderWrapper>
      <input
        type="text"
        value={filterName}
        maxLength="20"
        onChange={(event) => setFilterName(event.target.value)}
        placeholder="Input your filter name (Max 20 Characters)"
      />
      <ButtonContainer>
        <p className="button-clear">Clear all stickers</p>
        <Button
          onClick={() => onSaveFilter(filterName)}
          size="small"
          color="gradient"
          type="solid"
        >
          Filter Ready & Snap 📸
        </Button>
      </ButtonContainer>
    </HeaderWrapper>
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

  .button-clear {
    margin-right: 24px;

    color: #ffffff;
    font-family: "Racing Sans One", sans-serif;
    font-size: 15px;
    text-decoration: underline;
  }
`;

export default Header;
