import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import OptionSelect from "./OptionSelect";

test("옵션 클릭 시 toggle이 호출된다(보험)", () => {
  const opts = { insurance: false, hotel: false, car: false };
  const toggle = vi.fn(); // 가짜 함수(호출 여부 확인)

  render(<OptionSelect opts={opts} toggle={toggle} />);

  fireEvent.click(screen.getByText("여행자 보험"));

  expect(toggle).toHaveBeenCalledWith("insurance");
});
