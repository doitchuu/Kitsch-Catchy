import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";

import Sidebar from "../Sidebar";
import Header from "../Header";
import Modal from "../shared/Modal";
import Loading from "../shared/Loading";

import closeIcon from "../../assets/close_icon.svg";

function NewFilter() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(true);

  const canvasRef = useRef(null);

  function renderCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const baseImage = new Image();

    baseImage.src = "src/assets/face_sample_image.png";
    baseImage.onload = () => {
      const scale = Math.min(
        canvas.width / baseImage.width,
        canvas.height / baseImage.height,
      );
      const x = canvas.width / 2 - (baseImage.width / 2) * scale;
      const y = canvas.height / 2 - (baseImage.height / 2) * scale;
      const width = baseImage.width * scale;
      const height = baseImage.height * scale;

      ctx.drawImage(baseImage, x, y, width, height);
    };
  }

  function handleClosePopup(event) {
    event.preventDefault();

    setIsPopupOpened(false);
  }

  function addImageToCanvas(sticker) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.src = sticker.src;
    image.onload = () => {
      ctx.drawImage(
        image,
        (canvas.width - sticker.width) / 2,
        (canvas.height - sticker.height) / 2,
        sticker.width,
        sticker.height,
      );
    };
  }

  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <>
      {isLoading && (
        <Modal>
          <Loading
            description="Hang tight 👀 your unique filter is getting crafted!
          Just a bit longer and it's all yours"
          />
        </Modal>
      )}
      <FilterWrapper>
        <Sidebar onImageClick={addImageToCanvas} />
        <FilterContainer>
          <Header />
          <CanvasContainer>
            <StyledCanvas ref={canvasRef} width="700" height="700" />
          </CanvasContainer>
          {isPopupOpened && (
            <PopupContainer>
              Style Your Face Just Right! The better the fit, the cooler the
              pic.
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
    </>
  );
}

const FilterWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  background-color: #636366;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const CanvasContainer = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCanvas = styled.canvas`
  background-color: #ffffff;
`;

const PopupContainer = styled.div`
  position: fixed;
  z-index: 1;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 380px;
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
    opacity: 0.4;
  }
`;

export default NewFilter;
