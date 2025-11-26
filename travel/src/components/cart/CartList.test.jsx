import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import CartList from "./CartList";

const items = [{ id: "tokyo", title: "도쿄 3박4일", price: 450000, qty: 2 }];

test("수량 증가/감소/삭제 함수가 호출된다", () => {
  const onInc = vi.fn();
  const onDec = vi.fn();
  const onRemove = vi.fn();

  render(<CartList items={items} onInc={onInc} onDec={onDec} onRemove={onRemove} />);

  fireEvent.click(screen.getByText("+"));
  expect(onInc).toHaveBeenCalledWith("tokyo");

  fireEvent.click(screen.getByText("-"));
  expect(onDec).toHaveBeenCalledWith("tokyo");

  fireEvent.click(screen.getByText("삭제"));
  expect(onRemove).toHaveBeenCalledWith("tokyo");
});
