import React, { useState } from "react";
import styled from "@emotion/styled";

import Sidebar from "../Sidebar";
import Header from "../Header";

import closeIcon from "../../assets/close_icon.svg";

function NewFilter() {
  const [isPopupOpened, setIsPopupOpened] = useState(true);

  function handleClosePopup(event) {
    event.preventDefault();

    setIsPopupOpened(false);
  }

  return (
    <FilterWrapper>
      <Sidebar />
      <FilterContainer>
        <Header />
        <canvas />
        {isPopupOpened && (
          <PopupContainer>
            Style Your Face Just Right! The better the fit, the cooler the pic.
            <br />
            Avoid overlaps for a fab filter match!
            <img
              role="presentation"
              src={closeIcon}
              alt="closeIcon"
              className="icon-close"
              onClick={handleClosePopup}
            />
          </PopupContainer>
        )}
      </FilterContainer>
    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PopupContainer = styled.div`
  position: relative;
  z-index: 1;
  bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 28px;
  padding: 24px;
  border-radius: 8px;

  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  box-shadow:
    0 10px 36px rgba(0, 0, 0, 0.05),
    0 6px 6px rgba(0, 0, 0, 0.1);

  .icon-close {
    margin-left: 16px;
    width: 24px;
  }
`;

export default NewFilter;
