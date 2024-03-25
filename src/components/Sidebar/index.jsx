import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { nanoid } from "nanoid";

import useStickerStore from "../../store/sticker";

import logo from "../../../public/assets/kitsch_catchy_logo_small.png";
import plusIcon from "../../../public/assets/plus_icon.svg";
import defaultStickers from "../../../public/assets/defaultStickers.json";
import templates from "../../../public/assets/template.json";

function Sidebar({ onStickerClick }) {
  const [activeTab, setActiveTab] = useState("sticker");

  const { stickers, addSticker } = useStickerStore();

  const allStickers = [...stickers, ...defaultStickers];

  function handleStickerUpload(event) {
    event.preventDefault();

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function () {
        const image = new Image();

        image.onload = function () {
          addSticker({
            src: reader.result,
            size: {
              width: image.naturalWidth,
              height: image.naturalHeight,
            },
            position: { x: 10, y: 10 },
            type: "custom",
          });
        };
        image.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  function handleStickerClick(sticker) {
    onStickerClick(sticker);
  }

  return (
    <SidebarContainer>
      <Link to="/">
        <img src={logo} alt="logo" className="image-logo" />
      </Link>
      <h3 className="title">
        Tap Stickers or Templates
        <br />
        to Elevate Your Filter Game! 🎀
      </h3>
      <TabContainer>
        <TabItem
          active={activeTab === "sticker"}
          onClick={() => handleTabChange("sticker")}
        >
          Sticker
        </TabItem>
        <TabItem
          active={activeTab === "template"}
          onClick={() => handleTabChange("template")}
        >
          Template
        </TabItem>
        {activeTab === "sticker" && (
          <TabContent id="sticker-content" className="sticker-content">
            <div className="sticker-list">
              <label htmlFor="file">
                <div className="button-file">
                  <img src={plusIcon} alt="plusIcon" className="icon-plus" />
                  Upload
                  <br />
                  your sticker
                  <p className="description">(only image file)</p>
                </div>
                <input
                  id="file"
                  type="file"
                  name="file"
                  onChange={handleStickerUpload}
                  accept=".png,.jpg,image/*"
                />
              </label>
              {allStickers.map((sticker) => (
                <StickerImage
                  key={nanoid(10)}
                  src={sticker.src}
                  alt={sticker.name}
                  draggable="true"
                  onClick={() => handleStickerClick(sticker)}
                />
              ))}
            </div>
          </TabContent>
        )}
        {activeTab === "template" && (
          <TabContent id="template-content" className="template-content">
            <div className="template-list" id="template-content">
              {templates.map((template) => (
                <StickerImage
                  key={nanoid(10)}
                  src={template.src}
                  alt={template.type}
                  draggable="true"
                  onClick={() => handleStickerClick(template)}
                />
              ))}
            </div>
          </TabContent>
        )}
      </TabContainer>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  box-sizing: border-box;
  width: auto;
  min-width: 480px;
  margin: 0;
  padding: 40px;

  background-color: #2d2d2e;
  color: #ffffff;

  overflow-y: scroll;

  .image-logo {
    width: 200px;
  }

  .title {
    margin-top: 48px;
    margin-bottom: 32px;

    font-size: 20px;
    font-weight: 800;
    line-height: 30px;
  }
`;

const TabContainer = styled.div`
  margin: 0 auto;
  padding-bottom: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0, 0.2);
  width: 100%;
  height: 100%;

  .sticker-content,
  .template-content {
    display: flex;
    width: 100%;
    padding: 24px 2px;
  }
`;

const TabContent = styled.div`
  display: flex;

  input {
    display: none;
  }

  .sticker-list,
  .template-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: auto;
  }

  .button-file {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 160px;
    min-height: 160px;
    height: 100%;
    border-radius: 4px;

    background-color: #ffffff10;
    background-image: url("src/assets/dashed_button.svg");
    font-size: 16px;
    font-weight: 800;
    line-height: 22px;
    text-align: center;
  }

  .icon-plus {
    width: 36px;
    margin: 4px;
  }

  .description {
    margin: 4px;

    color: #b3b3b4;
    font-size: 14px;
    font-weight: 600;
  }
`;

const TabItem = styled.div`
  display: block;
  float: left;
  width: calc(100% / 2);
  height: 48px;
  border-bottom: 3px solid
    ${(props) => (props.active ? "#ffffff" : "transparent")};

  color: ${(props) => (props.active ? "#ffffff" : "rgba(255, 255, 255, 0.4)")};
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  font-weight: bold;

  transition: all 0.2s ease;
  cursor: pointer;
`;

const StickerImage = styled.img`
  width: 162px;
  height: 162px;
  padding: 12px;
  border-radius: 4px;

  background-color: rgba(255, 255, 255, 0.2);

  object-fit: contain;
  cursor: pointer;
`;

export default Sidebar;
