import { useState, useEffect, useCallback } from "react";
import TIME from "../constants/timeConstants";
import SIZE from "../constants/sizeConstants";

const CONTAINER_WIDTH = 800;
const CONTAINER_HEIGHT = 800;

function useDragAndResize({
  position: initialPosition,
  size: initialSize,
  aspectRatio,
  onDragEnd,
  onResize,
  id,
}) {
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [size, setSize] = useState(initialSize);

  const handleMouseMove = useCallback(
    (event) => {
      if (dragging) {
        setPosition((prev) => {
          const newX = prev.x + event.movementX * TIME.MOVE_SPEED;
          const newY = prev.y + event.movementY * TIME.MOVE_SPEED;

          // 경계 체크: 스티커가 컨테이너 밖으로 나가지 않도록 제한
          const boundedX = Math.max(
            0,
            Math.min(newX, CONTAINER_WIDTH - size.width),
          );
          const boundedY = Math.max(
            0,
            Math.min(newY, CONTAINER_HEIGHT - size.height),
          );

          return {
            x: boundedX,
            y: boundedY,
          };
        });

        return;
      }

      if (resizing) {
        const newWidth = Math.max(
          size.width + event.movementX * TIME.MOVE_SPEED,
          SIZE.MIN_IMAGE_SIZE,
        );
        const newHeight = newWidth / aspectRatio;

        // 리사이즈 시에도 컨테이너 경계를 넘지 않도록 제한
        const maxWidth = CONTAINER_WIDTH - position.x;
        const maxHeight = CONTAINER_HEIGHT - position.y;
        const constrainedWidth = Math.min(newWidth, maxWidth);
        const constrainedHeight = Math.min(newHeight, maxHeight);

        setSize({
          width: constrainedWidth,
          height: constrainedHeight,
        });
      }
    },
    [dragging, resizing, size, aspectRatio, position.x, position.y],
  );

  const handleMouseUp = useCallback(() => {
    if (dragging) {
      onDragEnd(id, { ...position });
      setDragging(false);
    }

    if (resizing) {
      onResize(id, { ...size });
      setResizing(false);
    }

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [
    dragging,
    resizing,
    position,
    size,
    onDragEnd,
    onResize,
    id,
    handleMouseMove,
  ]);

  useEffect(() => {
    if (dragging || resizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, resizing, handleMouseMove, handleMouseUp]);

  return { position, size, setDragging, setResizing };
}

export default useDragAndResize;
