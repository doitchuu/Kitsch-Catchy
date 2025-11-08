import { FILTER_AREA_SIZE } from "../constants/faceFilter";

/**
 * 샘플 이미지의 스티커 위치를 실제 얼굴 랜드마크에 매핑합니다
 * @param {Object} sticker - 스티커 정보 (position, size)
 * @param {Object} sampleLandmarks - 샘플 이미지의 얼굴 랜드마크
 * @param {Object} realLandmarks - 실제 카메라의 얼굴 랜드마크
 * @param {Object} realBox - 실제 얼굴의 바운딩 박스
 * @returns {Object} 매핑된 스티커 위치와 크기
 */
function mapStickerToFace(sticker, sampleLandmarks, realLandmarks, realBox) {
  if (!sampleLandmarks || !realLandmarks) {
    return null;
  }

  const sampleBox = sampleLandmarks.box;
  const sampleFaceCenter = sampleLandmarks.landmarks.faceCenter;
  const sampleImageWidth = sampleLandmarks.imageWidth;
  const sampleImageHeight = sampleLandmarks.imageHeight;

  const imageAspect = sampleImageWidth / sampleImageHeight;
  const containerAspect = 1;

  let displayWidth, displayHeight, offsetX, offsetY;

  if (imageAspect > containerAspect) {
    displayHeight = FILTER_AREA_SIZE;
    displayWidth = displayHeight * imageAspect;
    offsetX = -(displayWidth - FILTER_AREA_SIZE) / 2;
    offsetY = 0;
  } else {
    displayWidth = FILTER_AREA_SIZE;
    displayHeight = displayWidth / imageAspect;
    offsetX = 0;
    offsetY = -(displayHeight - FILTER_AREA_SIZE) / 2;
  }

  const displayScale = displayWidth / sampleImageWidth;

  const displayStickerX = sticker.position.x - offsetX;
  const displayStickerY = sticker.position.y - offsetY;

  const actualStickerX = displayStickerX / displayScale;
  const actualStickerY = displayStickerY / displayScale;
  const actualStickerWidth = sticker.size.width / displayScale;
  const actualStickerHeight = sticker.size.height / displayScale;

  const stickerCenterX = actualStickerX + actualStickerWidth / 2;
  const stickerCenterY = actualStickerY + actualStickerHeight / 2;

  const relativeX = (stickerCenterX - sampleFaceCenter.x) / sampleBox.width;
  const relativeY = (stickerCenterY - sampleFaceCenter.y) / sampleBox.height;

  const realFaceCenter = {
    x: realBox.x + realBox.width / 2,
    y: realBox.y + realBox.height / 2,
  };

  const mappedX = realFaceCenter.x + relativeX * realBox.width;
  const mappedY = realFaceCenter.y + relativeY * realBox.height;

  const scaleX = realBox.width / sampleBox.width;
  const scaleY = realBox.height / sampleBox.height;
  const scale = (scaleX + scaleY) / 2;

  const mappedWidth = actualStickerWidth * scale;
  const mappedHeight = actualStickerHeight * scale;

  return {
    x: mappedX - mappedWidth / 2,
    y: mappedY - mappedHeight / 2,
    width: mappedWidth,
    height: mappedHeight,
    rotation: sticker.rotation,
  };
}

export default mapStickerToFace;
