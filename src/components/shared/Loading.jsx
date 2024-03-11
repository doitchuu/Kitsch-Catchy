import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

function Loading({ description }) {
  return (
    <Wrapper>
      <Circle />
      <TextWrapper>
        <h1 className="title">Loading...</h1>
        <p className="description">{description}</p>
      </TextWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 560px;
  height: 366px;
`;

const TextWrapper = styled.div`
  padding: 28px;

  text-align: center;
  font-style: normal;

  .title {
    margin-bottom: 18px;

    color: #ffffff;
    font-size: 2rem;
    font-family: "Racing Sans One";
    font-weight: 900;
    line-height: 48px;
  }

  .description {
    width: 360px;

    color: #c0c0c0;
    font-size: 1rem;
    line-height: 24px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Circle = styled.div`
  animation: ${rotate} 2s linear infinite;

  width: 90px;
  height: 90px;
  border-radius: 50%;
  border-top: 8px solid #6b6b6b;
  border-right: 8px solid #6b6b6b;
  border-bottom: 8px solid #6b6b6b;
  border-left: 8px solid #f916f9;

  background-color: transparent;
`;

export default Loading;
