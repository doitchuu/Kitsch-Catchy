import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { nanoid } from "nanoid";

import logo from "../../assets/kitsch_catchy_logo_small.png";
import plusIcon from "../../assets/plus_icon.svg";

function Sidebar() {
  const [activeTab, setActiveTab] = useState("sticker");
  const [stickers, setStickers] = useState([]);
  const [templates, setTemplates] = useState([]);

  function handleStickerUpload(event) {
    event.preventDefault();
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
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
              {stickers &&
                stickers.map((sticker) => (
                  <img
                    key={nanoid(10)}
                    src={sticker.url}
                    alt={sticker.name}
                    draggable="true"
                  />
                ))}
            </div>
          </TabContent>
        )}
        {activeTab === "template" && (
          <TabContent id="template-content" className="template-content">
            <div className="tab-content" id="template-content">
              {templates &&
                templates.map((template) => (
                  <img
                    key={nanoid(10)}
                    src={template.url}
                    alt={template.name}
                    draggable="true"
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
  min-width: 400px;
  width: 40%;
  height: 100vh;
  margin: 0;
  padding: 40px;

  background-color: #2d2d2e;
  color: #ffffff;

  input {
    display: none;
  }

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
  margin-top: 50px;
  padding-bottom: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0, 0.2);
  margin: 0 auto;

  .sticker-content {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    margin: 0;
    padding: 20px 12px;
  }
`;

const TabContent = styled.div`
  display: flex;

  .sticker-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
  }

  .button-file {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 180px;
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

export default Sidebar;
