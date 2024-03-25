function getFaceCenter(landmarks) {
  const nose = landmarks.getNose();
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const mouth = landmarks.getMouth();

  const noseCenter = nose[3];
  const eyeCenter = {
    x: (leftEye[3].x + rightEye[0].x) / 2,
    y: (leftEye[3].y + rightEye[0].y) / 2,
  };
  const mouthCenter = {
    x: (mouth[0].x + mouth[6].x) / 2,
    y: (mouth[0].y + mouth[6].y) / 2,
  };

  return {
    x: (noseCenter.x + eyeCenter.x + mouthCenter.x) / 3,
    y: (noseCenter.y + eyeCenter.y + mouthCenter.y) / 3,
  };
}

export default getFaceCenter;
