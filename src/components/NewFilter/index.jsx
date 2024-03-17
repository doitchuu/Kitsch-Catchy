import React, { useState } from "react";
import styled from "@emotion/styled";

import { nanoid } from "nanoid";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Modal from "../shared/Modal";
import Loading from "../shared/Loading";
import ToastPopup from "../shared/ToastPopup";
import FilterSticker from "../FilterSticker";

import useFilterStore from "../../store/filter";

import SIZE from "../../constants/sizeConstants";
import closeIcon from "../../assets/close_icon.svg";

function NewFilter() {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({});
  const [isPopupOpened, setIsPopupOpened] = useState(true);
  const [selectedStickerId, setSelectedStickerId] = useState(null);

  const {
    filterStickers,
    addFilterSticker,
    deleteFilterSticker,
    updateFilterSticker,
  } = useFilterStore();

  function handleClosePopup(event) {
    event.preventDefault();

    setIsPopupOpened(false);
  }

  function handleAddSticker(newSticker) {
    if (filterStickers.length >= SIZE.MAX_ADDITIONAL_NUMBER) {
      setToast({ status: true, message: "Stick to 15 Stickers Max! 🥲" });

      return;
    }

    addFilterSticker({
      ...newSticker,
      id: nanoid(10),
      position: { x: 10, y: 10 },
      size: {
        width: newSticker.size.width / 2,
        height: newSticker.size.height / 2,
      },
      zIndex: filterStickers.length,
    });
  }

  function handleDragEnd(id, newPosition) {
    updateFilterSticker(id, { position: newPosition });
  }

  function handleResize(id, newSize) {
    updateFilterSticker(id, { size: newSize });
  }

  function handleSelect(id) {
    updateFilterSticker(id, { zIndex: filterStickers.length });

    filterStickers.forEach((sticker) => {
      if (sticker.id !== id && sticker.zIndex >= 1) {
        updateFilterSticker(sticker.id, { zIndex: sticker.zIndex - 1 });
      }
    });

    setSelectedStickerId(id);
  }

  function handleDelete(id) {
    deleteFilterSticker(id);
  }

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
        <Sidebar onStickerClick={handleAddSticker} />
        <FilterContainer>
          <Header />
          <BackgroundContainer>
            <FilterCreationArea>
              {filterStickers.map((filterSticker) => (
                <FilterSticker
                  key={filterSticker.id}
                  id={filterSticker.id}
                  src={filterSticker.src}
                  position={filterSticker.position}
                  size={filterSticker.size}
                  zIndex={filterSticker.zIndex}
                  selected={filterSticker.id === selectedStickerId}
                  onDragEnd={handleDragEnd}
                  onResize={handleResize}
                  onSelect={handleSelect}
                  onDelete={handleDelete}
                />
              ))}
            </FilterCreationArea>
          </BackgroundContainer>
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
          {toast.status && (
            <ToastPopup setToast={setToast} message={toast.message} />
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

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const FilterCreationArea = styled.div`
  position: relative;
  width: 800px;
  height: 800px;
  border: 2px solid #4f4f4f;
  overflow: hidden;

  background-image: url("src/assets/face_sample_image.png");
  background-size: cover;
  box-shadow:
    0 10px 36px rgba(0, 0, 0, 0.05),
    0 6px 6px rgba(0, 0, 0, 0.1);
`;

const PopupContainer = styled.div`
  position: fixed;
  z-index: 16;
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
