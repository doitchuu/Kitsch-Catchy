import React from "react";
import styled from "@emotion/styled";

const buttonSizes = {
  small: {
    minWidth: "120px",
    height: "44px",
    padding: "12px 16px",
    fontFamily: "'Racing Sans One', sans-serif",
    fontSize: "16px",
  },
  medium: {
    minWidth: "240px",
    height: "56px",
    padding: "12px 24px",
    fontFamily: "'Racing Sans One', sans-serif",
    fontSize: "16px",
  },
  large: {
    minWidth: "264px",
    height: "64px",
    padding: "16px 32px",
    fontFamily: "'Racing Sans One', sans-serif",
    fontSize: "18px",
  },
};

const buttonTypes = {
  solid: {
    borderRadius: "8px",
  },
  outline: {
    borderRadius: "4px",
    border: "1px #D1D1D1",
  },
  round: {
    borderRadius: "40px",
  },
};

const buttonColors = {
  white: {
    backgroundColor: "#FFFFFF",
    color: "#FFFFFF",
  },
  pink: {
    backgroundColor: "#FD14FD",
    color: "#FFFFFF",
  },
  lightGray: {
    backgroundColor: "#E1E1E1",
    color: "#000000",
  },
  darkGray: {
    backgroundColor: "#3E3E3E",
    color: "#FFFFFF",
  },
  red: {
    backgroundColor: "#FA4545",
    color: "#FFFFFF",
  },
  gradient: {
    background: `linear-gradient(130deg, rgba(249,22,185,1) 0%, rgba(249,22,185,1) 51%, rgba(210,32,255,1) 100%)`,
    color: "#FFFFFF",
  },
};

const iconStyle = {
  marginRight: "8px",
};

const StyledButton = styled.button`
  ${({ size }) => buttonSizes[size]};
  ${({ color }) => buttonColors[color]};
  ${({ type }) => buttonTypes[type]}
  ${({ icon }) => icon && iconStyle[icon]};

  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

function Button({ children, onClick, className, size, color, type, icon }) {
  return (
    <StyledButton
      size={size}
      color={color}
      type={type}
      onClick={onClick}
      className={className}
    >
      {icon && <img src={icon} alt="icon" style={iconStyle} />}
      {children}
    </StyledButton>
  );
}

export default Button;
