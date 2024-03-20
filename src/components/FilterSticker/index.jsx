import React, { useEffect } from "react";
import debounce from "lodash/debounce";
import styled from "@emotion/styled";

import useDragAndResize from "../../hooks/useDragAndResize";

import useFilterStore from "../../store/filter";

import TIME from "../../constants/timeConstants";

function FilterSticker({
  src,
  id,
  size,
  position,
  zIndex,
  selected,
  onSelect,
  onDragEnd,
  onDelete,
  onResize,
}) {
  const {
    position: newPosition,
    size: newSize,
    setDragging,
    setResizing,
  } = useDragAndResize({
    position,
    size,
    onDragEnd,
    onResize,
    id,
  });

  const { updateFilterSticker } = useFilterStore();

  const onMouseDown = debounce((event) => {
    event.stopPropagation();

    onSelect(id);

    if (event.target.dataset.resize) {
      updateFilterSticker(id, { size: newSize });
      setResizing(true);
    } else {
      updateFilterSticker(id, { position: newPosition });
      setDragging(true);
    }
  }, TIME.DELAY);

  return (
    <StickerWrapper
      x={newPosition.x}
      y={newPosition.y}
      width={newSize.width}
      height={newSize.height}
      zIndex={zIndex}
      selected={selected}
      onMouseDown={onMouseDown}
    >
      <img src={src} alt={`Draggable ${id}`} draggable="false" />
      {selected && (
        <>
          <SelectedSticker data-resize="true" className="bottom-right" />
          <SelectedSticker data-resize="true" className="bottom-left" />
          <SelectedSticker data-resize="true" className="top-right" />
          <SelectedSticker data-resize="true" className="top-left" />
          <CloseButton onClick={() => onDelete(id)}>x</CloseButton>
        </>
      )}
    </StickerWrapper>
  );
}

const StickerWrapper = styled.div`
  position: absolute;
  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y}px`};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  z-index: ${({ zIndex }) => zIndex};
  border: ${({ selected }) => (selected ? "4px solid #F916F9" : "none")};

  cursor: grab;
  user-select: none;

  img {
    width: 100%;
    height: 100%;
  }
`;

const SelectedSticker = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;

  background-color: #ffffff;
  border: 4px solid #f916f9;

  &.top-left {
    top: -10px;
    left: -10px;

    cursor: nw-resize;
  }

  &.top-right {
    top: -10px;
    right: -10px;

    cursor: ne-resize;
  }

  &.bottom-left {
    bottom: -10px;
    left: -10px;

    cursor: sw-resize;
  }

  &.bottom-right {
    bottom: -10px;
    right: -10px;

    cursor: se-resize;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  bottom: -80px;
  left: 50%;
  right: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border: 1px solid #b8b8b8;

  background-color: #ffffff;
  color: #555555;
  border-radius: 40px;
  font-size: 1.25rem;
  font-weight: 500;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);

  cursor: pointer;
`;

export default FilterSticker;
