import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { beforeEach, afterEach, describe, vi } from "vitest";

import { BrowserRouter } from "react-router-dom";

import Onboarding from "../../components/Onboarding";

const mockedNavigator = vi.fn();

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockedNavigator,
}));

const formatTargetComponent = (targetComponent) => {
  return <BrowserRouter>{targetComponent}</BrowserRouter>;
};

beforeEach(() => {
  render(formatTargetComponent(<Onboarding />));
});

afterEach(() => {
  cleanup();
});

describe("Onboarding Component Test", () => {
  it("온보딩 페이지에서 서비스 로고가 렌더 되어야 합니다", () => {
    const logoElem = screen.getByAltText("logo");

    expect(logoElem).toBeInTheDocument();
  });

  it("온보딩 페이지에서 필터 만들기 버튼이 렌더되고, 클릭 이벤트를 처리할 수 있어야 합니다", () => {
    const filterButtonElem = screen.getByText("✨ Make your filter ✨");

    fireEvent.click(filterButtonElem);

    expect(filterButtonElem).toBeInTheDocument();
    expect(mockedNavigator).toBeCalledWith("/new");
  });

  it("온보딩 페이지에서 서비스 안내 버튼이 렌더되고, 버튼을 누르면 서비스 안내 팝업이 열려야 합니다", () => {
    const serviceButtonElem = screen.getByText("Peek Into Our World?");

    fireEvent.click(serviceButtonElem);

    const popupElem = screen.getByText(
      /Craft Filters, Your Way.*Snap Pics That Scream 'You'!/
    );

    expect(serviceButtonElem).toBeInTheDocument();
    expect(popupElem).toBeInTheDocument();
  });

  it("온보딩 페이지에서 서비스 안내 팝업이 열린 후, 'Let's Roll!' 버튼 클릭으로 팝업을 닫을 수 있어야 합니다", () => {
    fireEvent.click(screen.getByText("Peek Into Our World?"));

    const closeButtonElem = screen.getByText("Let's Roll!");
    const popupElem = screen.getByText(
      /Craft Filters, Your Way.*Snap Pics That Scream 'You'!/
    );

    fireEvent.click(closeButtonElem);

    expect(popupElem).not.toBeInTheDocument();
  });
});
