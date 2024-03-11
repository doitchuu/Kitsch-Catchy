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
  z-index: 2;
  top: 87%;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  border-radius: 20px;

  animation: ${fadeInUp} 0.5s ease-in-out;

  opacity: 0.8;
  background-color: #000000;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
`;

export default ToastPopup;
