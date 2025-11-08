import {
  SAMPLE_IMAGE_WIDTH,
  SAMPLE_IMAGE_HEIGHT,
} from "../constants/faceFilter";

/**
 * 샘플 이미지의 얼굴 랜드마크를 수동으로 정의합니다
 * face_sample_image.png (1024x1024)의 얼굴 위치를 기반으로 함
 */
function getManualSampleLandmarks() {
  const imageWidth = SAMPLE_IMAGE_WIDTH;
  const imageHeight = SAMPLE_IMAGE_HEIGHT;

  // 얼굴이 중앙에 위치하고 약 70% 크기를 차지한다고 가정
  const faceWidth = imageWidth * 0.5;
  const faceHeight = imageHeight * 0.6;
  const faceX = (imageWidth - faceWidth) / 2;
  const faceY = (imageHeight - faceHeight) / 2 - imageHeight * 0.05; // 약간 위쪽

  // 얼굴 중심점
  const faceCenterX = imageWidth / 2;
  const faceCenterY = imageHeight / 2;

  // 주요 랜드마크 위치 (이미지 기준 대략적인 위치)
  const landmarks = {
    leftEye: {
      x: faceCenterX - faceWidth * 0.15,
      y: faceCenterY - faceHeight * 0.15,
    },
    rightEye: {
      x: faceCenterX + faceWidth * 0.15,
      y: faceCenterY - faceHeight * 0.15,
    },
    nose: {
      x: faceCenterX,
      y: faceCenterY,
    },
    mouth: {
      x: faceCenterX,
      y: faceCenterY + faceHeight * 0.2,
    },
    faceCenter: {
      x: faceCenterX,
      y: faceCenterY,
    },
  };

  return {
    imageWidth,
    imageHeight,
    box: {
      x: faceX,
      y: faceY,
      width: faceWidth,
      height: faceHeight,
    },
    landmarks,
    allLandmarks: [], // 사용하지 않음
  };
}

export default getManualSampleLandmarks;
