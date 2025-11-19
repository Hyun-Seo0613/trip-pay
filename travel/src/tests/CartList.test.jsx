import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartList from "../components/cart/CartList";

// CartList 컴포넌트의 렌더링 및 이벤트 동작을 검증하는 테스트

describe("CartList Component", () => {
  test("renders items and handles increment/decrement/remove", async () => {
    // 테스트용 장바구니 아이템
    const items = [
      { id: 1, title: "Trip A", price: 1000, qty: 1 },
      { id: 2, title: "Trip B", price: 2000, qty: 2 },
    ];

    // 콜백 함수들을 mock 처리
    const onInc = vi.fn(); // 수량 증가 함수
    const onDec = vi.fn(); // 수량 감소 함수
    const onRemove = vi.fn(); // 삭제 함수

    // CartList 렌더링
    render(<CartList items={items} onInc={onInc} onDec={onDec} onRemove={onRemove} />);

    // 상품명이 정상적으로 렌더링되는지 확인
    expect(screen.getByText("Trip A")).toBeInTheDocument();
    expect(screen.getByText("Trip B")).toBeInTheDocument();

    // [+] 버튼 클릭 → onInc 호출되는지 확인
    await userEvent.click(screen.getAllByText("+")[0]);
    expect(onInc).toHaveBeenCalled();

    // [-] 버튼 클릭 → onDec 호출되는지 확인
    await userEvent.click(screen.getAllByText("-")[0]);
    expect(onDec).toHaveBeenCalled();

    // [삭제] 클릭 → onRemove 호출되는지 확인
    await userEvent.click(screen.getAllByText("삭제")[0]);
    expect(onRemove).toHaveBeenCalled();
  });
});