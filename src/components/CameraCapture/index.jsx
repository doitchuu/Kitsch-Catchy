import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import styled from "@emotion/styled";

import { FiRepeat } from "react-icons/fi";
import { RiDownloadLine, RiDeleteBinLine } from "react-icons/ri";
import Button from "../shared/Button";
import Popup from "../shared/Popup";

import useFilterStore from "../../store/filter";

import TIME from "../../constants/timeConstants";
import getFaceCenter from "../../utils/getFaceCenter";
import threeImage from "../../../public/assets/numbers/number_3.png";
import twoImage from "../../../public/assets/numbers/number_2.png";
import oneImage from "../../../public/assets/numbers/number_1.png";

function CameraCapture() {
  const backgrounds = [
    "/assets/backgrounds/background1.jpg",
    "/assets/backgrounds/background2.jpg",
    "/assets/backgrounds/background3.jpg",
    "/assets/backgrounds/background4.jpg",
    "/assets/backgrounds/background5.jpg",
  ];

  const [isOpenedRefilterPopup, setIsOpenedRefilterPopup] = useState(false);
  const [isOpenedHomePopup, setIsOpenedHomePopup] = useState(false);
  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);

  const [showedFlash, setShowedFlash] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdownNumber, setCountdownNumber] = useState(null);

  const navigate = useNavigate();

  const { filterStickers } = useFilterStore();

  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const streamRef = useRef(null);
  const offScreenCanvasRef = useRef(null);
  const stickerImages = useRef({});

  const countdownImages = { 3: threeImage, 2: twoImage, 1: oneImage };

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

  function handleChangeBackground() {
    setCurrentBackground(
      (previous) =>
        backgrounds[(backgrounds.indexOf(previous) + 1) % backgrounds.length],
    );
  }

  function capturePhoto() {
    const video = videoRef.current;
    const stickersCanvas = canvasRef.current;
    const captureCanvas = document.createElement("canvas");

    if (!video || !stickersCanvas) {
      setIsCapturing(false);

      return;
    }

    captureCanvas.width = video.videoWidth;
    captureCanvas.height = video.videoHeight;

    const captureContext = captureCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    captureContext.drawImage(
      video,
      0,
      0,
      captureCanvas.width,
      captureCanvas.height,
    );
    captureContext.drawImage(
      stickersCanvas,
      0,
      0,
      captureCanvas.width,
      captureCanvas.height,
    );

    const capturedImage = captureCanvas.toDataURL("image/png");

    setShowedFlash(true);

    setTimeout(() => {
      setCapturedPhoto(capturedImage);
      setShowPhoto(true);
      setShowedFlash(false);
      setIsCapturing(false);
    }, TIME.FLASH);

    videoRef.current.pause();
  }

  function handleCapturePhoto() {
    setIsCapturing(true);
    setCountdownNumber(3);

    const countdownInterval = setInterval(() => {
      setCountdownNumber((prevNumber) => {
        if (prevNumber === 1) {
          clearInterval(countdownInterval);
          capturePhoto();

          return null;
        }

        return prevNumber - 1;
      });
    }, 1000);
  }

  function handleDownloadPhoto() {
    const imageName = `${new Date().toISOString().split("T").join(" ")}.png`;

    if (photoRef.current) {
      photoRef.current.href = capturedPhoto;
      photoRef.current.download = imageName;
      photoRef.current.click();
    }
  }

  function handleClosePhoto() {
    setCapturedPhoto("");
    setShowPhoto(false);

    videoRef.current.play();
  }

  function calculateStickerRotation(landmarks) {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const leftEyeCenter = leftEye.reduce(
      (sum, point) => ({
        x: sum.x + point.x / leftEye.length,
        y: sum.y + point.y / leftEye.length,
      }),
      { x: 0, y: 0 },
    );
    const rightEyeCenter = rightEye.reduce(
      (sum, point) => ({
        x: sum.x + point.x / rightEye.length,
        y: sum.y + point.y / rightEye.length,
      }),
      { x: 0, y: 0 },
    );

    return Math.atan2(
      rightEyeCenter.y - leftEyeCenter.y,
      rightEyeCenter.x - leftEyeCenter.x,
    );
  }

  function renderStickers(detection, canvasContext) {
    const { landmarks } = detection;
    const faceCenter = getFaceCenter(landmarks);
    const {
      x: faceX,
      y: faceY,
      width: faceWidth,
      height: faceHeight,
    } = detection.detection.box;

    filterStickers.forEach((sticker, index) => {
      if (!sticker.position || !sticker.size) {
        return;
      }

      const stickerImage = stickerImages.current[sticker.src];

      if (!stickerImage) {
        return;
      }

      const stickerWidth = Math.floor(
        (sticker.size.width / 389.13) * faceWidth,
      );
      let stickerHeight;
      let relativeX;
      let relativeY;

      if (sticker.type === "template") {
        stickerHeight = Math.floor((sticker.size.height / 529.44) * faceHeight);
        relativeX = faceX + faceWidth / 2 - stickerWidth / 2;
        relativeY = faceY + faceHeight / 2 - stickerHeight / 2 - faceHeight / 3;
      } else {
        const originalAspectRatio =
          stickerImage.naturalHeight / stickerImage.naturalWidth;

        stickerHeight = stickerWidth * originalAspectRatio;
        relativeX = Math.floor(
          faceCenter.x +
            (sticker.position.x - 500) * (faceWidth / 800) +
            faceWidth * 0.25 * index,
        );
        relativeY = Math.floor(
          faceCenter.y +
            (sticker.position.y - 400) * (faceHeight / 800) +
            faceHeight * 0.35 * index -
            100,
        );
      }

      canvasContext.save();
      canvasContext.translate(
        relativeX + stickerWidth / 2,
        relativeY + stickerHeight / 2,
      );
      canvasContext.rotate(calculateStickerRotation(landmarks));
      canvasContext.drawImage(
        stickerImage,
        -stickerWidth / 2,
        -stickerHeight / 2,
        stickerWidth,
        stickerHeight,
      );
      canvasContext.restore();
    });
  }

  function detectFace() {
    const video = videoRef.current;
    if (!video) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const displaySize = { width: video.videoWidth, height: video.videoHeight };

    faceapi.matchDimensions(canvas, displaySize);

    const processFrame = () => {
      if (isCapturing) {
        return;
      }

      faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .then((detections) => {
          context.clearRect(0, 0, displaySize.width, displaySize.height);

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize,
          );

          resizedDetections.forEach((resizedDetection) => {
            renderStickers(resizedDetection, context);
          });

          requestAnimationFrame(processFrame);
        });
    };

    processFrame();
  }

  function getUserCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;

        const video = videoRef.current;

        if (!video) return;

        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          detectFace();
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function loadModels() {
    await Promise.all([
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    ]);
  }

  useEffect(() => {
    offScreenCanvasRef.current = new OffscreenCanvas(
      videoRef.current.videoWidth || 1200,
      videoRef.current.videoHeight || 800,
    );

    const offScreenContext = offScreenCanvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });

    filterStickers.forEach((sticker) => {
      if (!stickerImages.current[sticker.src]) {
        const image = new Image();
        image.src = sticker.src;
        image.onload = () => {
          stickerImages.current[sticker.src] = image;
          offScreenContext.drawImage(image, 0, 0);
        };
      }
    });
  }, [filterStickers]);

  useEffect(() => {
    let frameId;

    loadModels().then(() => {
      getUserCamera();

      frameId = requestAnimationFrame(detectFace);
    });

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });

        streamRef.current = null;
      }

      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d", {
          willReadFrequently: true,
        });

        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
      }
    };
  }, []);

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
        {showedFlash && <div className="flash" />}
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
          {countdownNumber !== null && (
            <Countdown>
              <img
                src={countdownImages[countdownNumber]}
                alt={`${countdownNumber}`}
              />
            </Countdown>
          )}
          {showPhoto && (
            <PhotoContainer>
              <a
                ref={photoRef}
                href={capturedPhoto}
                className="link-photo"
                aria-label="photo"
              />
              <Button
                size="large"
                color="white"
                type="round"
                className="button-download"
                onClick={handleDownloadPhoto}
                aria-label="download button"
              >
                <RiDownloadLine className="icon-download" />
                Download your cup of tea
              </Button>
              <button
                onClick={handleClosePhoto}
                className="button-delete"
                aria-label="delete button"
              >
                <RiDeleteBinLine className="icon-delete" />
              </button>
            </PhotoContainer>
          )}
          <VideoContainer>
            <Video
              ref={videoRef}
              onLoadedMetadata={detectFace}
              autoPlay
              muted
            />
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
            onClick={handleCapturePhoto}
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
    border-radius: 50%;

    background-color: rgba(255, 255, 255, 1);
    box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.1);
  }

  .icon-change {
    size: 3rem;
  }

  .flash {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;

    background-color: #ffffff;
    opacity: 0.8;
  }
`;

const CameraContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 46%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 680px;

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
    width: 14px;
    height: 14px;
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

const PhotoContainer = styled.div`
  position: absolute;
  bottom: 40px;
  z-index: 4;
  display: flex;
  justify-content: center;
  width: 100%;

  a {
    display: none;
  }

  .link {
    display: none;
  }

  .button-delete {
    width: 64px;
    height: 64px;
    margin-left: 16px;
    border-radius: 50%;
    border: none;

    background-color: #ee4a4a;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .button-download {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .icon-delete {
    font-size: 1.25rem;
    color: #ffffff;
  }

  .icon-download {
    margin-right: 8px;
    padding: 4px 0px 0px;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  width: 1000px;
  height: 642px;
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
  height: 100px;
  border-top: 1px solid #e3e3e3;

  background-color: #ffffff;

  .button-optional:hover {
    color: #fc43e7;
    font-size: 1.2rem;

    transition: 0.4s;
  }

  .button-camera {
    width: 72px;
    height: 72px;
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
  width: 1000px;
  height: 642px;
  object-fit: cover;
`;

const Canvas = styled.canvas`
  position: absolute;
  width: 1000px;
  height: 642px;
  object-fit: cover;
`;

const Countdown = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  img {
    width: 200px;
    height: 200px;
  }
`;

export default CameraCapture;
