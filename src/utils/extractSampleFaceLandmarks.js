import * as faceapi from "face-api.js";
import {
  SAMPLE_IMAGE_WIDTH,
  SAMPLE_IMAGE_HEIGHT,
} from "../constants/faceFilter";

/**
 * 샘플 이미지에서 얼굴 랜드마크를 추출합니다
 * @param {string} imagePath - 샘플 이미지 경로
 * @returns {Promise<Object>} 얼굴 랜드마크 및 바운딩 박스 정보
 */
async function extractSampleFaceLandmarks(imagePath) {
  const img = await faceapi.fetchImage(imagePath);

  const detection = await faceapi
    .detectSingleFace(
      img,
      new faceapi.TinyFaceDetectorOptions({
        inputSize: 512,
        scoreThreshold: 0.3,
      }),
    )
    .withFaceLandmarks(true);

  if (!detection) {
    throw new Error("샘플 이미지에서 얼굴을 찾을 수 없습니다.");
  }

  const { landmarks } = detection;
  const { box } = detection.detection;

  // 주요 랜드마크 포인트 추출
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const nose = landmarks.getNose();
  const mouth = landmarks.getMouth();

  // 각 랜드마크의 중심점 계산
  const calculateCenter = (points) => {
    const sum = points.reduce(
      (acc, point) => ({
        x: acc.x + point.x,
        y: acc.y + point.y,
      }),
      { x: 0, y: 0 },
    );

    return {
      x: sum.x / points.length,
      y: sum.y / points.length,
    };
  };

  const leftEyeCenter = calculateCenter(leftEye);
  const rightEyeCenter = calculateCenter(rightEye);
  const noseCenter = nose[3]; // 코끝
  const mouthCenter = calculateCenter(mouth);

  // 얼굴 중심 계산
  const faceCenter = {
    x: (leftEyeCenter.x + rightEyeCenter.x + noseCenter.x + mouthCenter.x) / 4,
    y: (leftEyeCenter.y + rightEyeCenter.y + noseCenter.y + mouthCenter.y) / 4,
  };

  return {
    imageWidth: SAMPLE_IMAGE_WIDTH,
    imageHeight: SAMPLE_IMAGE_HEIGHT,
    box: {
      x: box.x,
      y: box.y,
      width: box.width,
      height: box.height,
    },
    landmarks: {
      leftEye: leftEyeCenter,
      rightEye: rightEyeCenter,
      nose: noseCenter,
      mouth: mouthCenter,
      faceCenter,
    },
    allLandmarks: landmarks.positions,
  };
}

export default extractSampleFaceLandmarks;
