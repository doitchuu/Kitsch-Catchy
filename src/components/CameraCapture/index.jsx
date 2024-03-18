import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import styled from "@emotion/styled";

import { FiRepeat } from "react-icons/fi";
import Button from "../shared/Button";
import Popup from "../shared/Popup";

function CameraCapture() {
  const backgrounds = [
    "src/assets/background1.jpg",
    "src/assets/background2.jpg",
    "src/assets/background3.jpg",
    "src/assets/background4.jpg",
    "src/assets/background5.jpg",
  ];

  const [isOpenedRefilterPopup, setIsOpenedRefilterPopup] = useState(false);
  const [isOpenedHomePopup, setIsOpenedHomePopup] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);

  const navigate = useNavigate();

  const canvasRef = useRef();
  const videoRef = useRef();

  function handleClosePopup(event) {
    event.preventDefault();

    setIsOpenedHomePopup(false);
    setIsOpenedRefilterPopup(false);
  }

  function handleRefilter(event) {
    event.preventDefault();

    setIsOpenedRefilterPopup(false);

    navigate("/new");
  }

  function handleMoveToHome(event) {
    event.preventDefault();

    setIsOpenedHomePopup(false);

    navigate("/");
  }

  function getUserCamera() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        const video = videoRef.current;

        video.srcObject = stream;

        video.play();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChangeBackground() {
    setCurrentBackground(
      (prev) =>
        backgrounds[(backgrounds.indexOf(prev) + 1) % backgrounds.length],
    );
  }

  function handleCapture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (video && canvas) {
      const { videoWidth, videoHeight } = video;

      canvas.width = videoWidth;
      canvas.height = videoHeight;

      context.drawImage(video, 0, 0, videoWidth, videoHeight);
      canvas.toDataURL("image/png");
    }
  }

  useEffect(() => {
    async function loadModels() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    }

    getUserCamera();
    loadModels();
  }, [videoRef]);

  return (
    <>
      {isOpenedHomePopup && (
        <Popup
          handleClosePopup={handleClosePopup}
          handleClick={handleMoveToHome}
          buttonColor="red"
          buttonText="Okay.. I know it"
          title="Head Back Home?"
          description="Going Home Will Clear Your Current Filter. Head Back?"
        />
      )}
      {isOpenedRefilterPopup && (
        <Popup
          handleClosePopup={handleClosePopup}
          handleClick={handleRefilter}
          buttonColor="red"
          buttonText="Okay.. I know it"
          title="🚨 Warning 🚨"
          description="Your crafted filter will be gone for good.
          If you're cool with that, hit 'Okay...I know it'."
        />
      )}
      <CameraWrapper backgroundImage={currentBackground}>
        <button
          className="button-change-background"
          aria-label="change background button"
          onClick={handleChangeBackground}
        >
          <FiRepeat size="22" color="#212529" />
        </button>
        <CameraContainer>
          <div className="header">
            <div className="controls">
              <div className="button-red" />
              <div className="button-yellow" />
              <div className="button-green" />
            </div>
          </div>
          <VideoContainer>
            <Video ref={videoRef} autoPlay muted />
            <Canvas ref={canvasRef} />
          </VideoContainer>
        </CameraContainer>
        <BottomNavigation>
          <Button
            size="large"
            type="outline"
            color="white"
            className="button-optional"
            aria-label="go to home button"
            onClick={(event) => {
              event.preventDefault();

              setIsOpenedHomePopup(true);
            }}
          >
            Go to home
          </Button>
          <button
            className="button-camera"
            aria-label="camera button"
            onClick={handleCapture}
          />
          <Button
            size="large"
            type="outline"
            color="white"
            className="button-optional"
            aria-label="refilter button"
            onClick={(event) => {
              event.preventDefault();

              setIsOpenedRefilterPopup(true);
            }}
          >
            Refilter it
          </Button>
        </BottomNavigation>
      </CameraWrapper>
    </>
  );
}

const CameraWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .button-change-background {
    position: fixed;
    top: 28px;
    right: 28px;
    padding: 18px 18px 14px;
    border: 1px solid #f3f3f3;
    size: 3rem;

    border-radius: 40px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.1);
  }

  .icon-change {
    size: 3rem;
  }
`;

const CameraContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 46%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 800px;

  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;

    background-color: #e6e6e6;
    border-bottom: 1px solid #d6d6d6;
  }

  .controls {
    display: flex;
  }

  .button-red,
  .button-yellow,
  .button-green {
    width: 18px;
    height: 18px;
    margin-left: 12px;
    border-radius: 50%;
  }

  .button-yellow {
    background-color: #f7d54a;
  }

  .button-green {
    background-color: #62c462;
  }

  .button-red {
    background-color: #ee5f5b;
  }

  .window-content {
    padding: 12px;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const BottomNavigation = styled.div`
  position: fixed;
  bottom: 0px;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 120px;
  border-top: 1px solid #e3e3e3;

  background-color: #ffffff;

  .button-optional:hover {
    color: #fc43e7;
    font-size: 1.2rem;

    transition: 0.4s;
  }

  .button-camera {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 9px solid transparent;

    background-image: linear-gradient(white, white),
      linear-gradient(
        130deg,
        rgba(249, 22, 185, 1) 0%,
        rgba(249, 22, 185, 1) 51%,
        rgba(210, 32, 255, 1) 100%
      );
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
`;

const Video = styled.video`
  position: absolute;
  width: 1200px;
  height: 757px;
  object-fit: cover;
`;
const Canvas = styled.canvas`
  position: absolute;
  width: 1200px;
  height: 757px;
  object-fit: cover;
`;

export default CameraCapture;
