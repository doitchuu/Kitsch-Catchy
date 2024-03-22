import { useEffect } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import TIME from "../../constants/timeConstants";

function ToastPopup({ message, setToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({ status: false, message: "" });
    }, TIME.TOAST);

    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return <ToastContainer>{message}</ToastContainer>;
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  z-index: 3;
  top: 88%;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 56px;
  margin: 0 40px;
  padding: 16px;

  background-color: #000000;
  color: #ffffff;
  opacity: 0.8;
  border-radius: 12px;
  font-size: 1.25rem;
  font-weight: 700;

  animation: ${fadeInUp} 0.5s ease-in-out;
`;

export default ToastPopup;
