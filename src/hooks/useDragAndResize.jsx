import { useState, useEffect } from "react";
import TIME from "../constants/timeConstants";
import SIZE from "../constants/sizeConstants";

function useDragAndResize(initialPosition, initialSize, onDragEnd, onResize) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  function handleMouseMove(event) {
    if (dragging) {
      setPosition((prev) => ({
        x: prev.x + event.movementX * TIME.MOVE_SPEED,
        y: prev.y + event.movementY * TIME.MOVE_SPEED,
      }));
    } else if (resizing) {
      setSize((prev) => ({
        width: Math.max(
          prev.width + event.movementX * TIME.MOVE_SPEED,
          SIZE.MIN_IMAGE_SIZE,
        ),
        height: Math.max(
          prev.height + event.movementY * TIME.MOVE_SPEED,
          SIZE.MIN_IMAGE_SIZE,
        ),
      }));
    }
  }

  function handleMouseUp() {
    if (dragging) {
      onDragEnd(position);
      setDragging(false);
    }

    if (resizing) {
      onResize(size);
      setResizing(false);
    }

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }

  useEffect(() => {
    if (dragging || resizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
  }, [dragging, resizing, position, size, onDragEnd, onResize]);

  return { position, size, setDragging, setResizing };
}

export default useDragAndResize;
