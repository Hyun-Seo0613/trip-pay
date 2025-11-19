import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { TravelContext } from "../Context/TravelContext";
import { MemoryRouter } from "react-router-dom";
import CheckoutPage from "../pages/CheckoutPage";
import { vi } from "vitest";

// 전체 CheckoutPage 동작을 통합적으로 검증
describe("CheckoutPage Component Basic Flow Test", () => {
  // 옵션 선택 -> 수량 변경 -> 폼 입력 -> 결제 버튼 -> 결제 완료까지 흐름 검증
  test("should handle selecting options, updating cart, validating form, and submitting payment", async () => {
    // alert를 mock으로 대체 (결제 완료 메시지 확인용)
    global.alert = vi.fn();
    const user = userEvent.setup();

    // Context Provider를 테스트 환경에서 재구성
    function MockProvider({ children }) {
      // 장바구니 데이터 상태
      const [cartItems, setCartItems] = useState([{ id: 1, title: "테스트 상품", price: 1000, qty: 1 }]);
      // 옵션 상태
      const [opts, setOpts] = useState({ insurance: false, hotel: false, car: false });
      // 폼 상태
      const [form, setForm] = useState({ name: "홍길동", phone: "010-1234-5678", email: "aaa@bbb.com" });
      // 폼 오류 상태
      const [formErrors, setFormErrors] = useState([]);
      // 결제 진행 상태
      const [submitting, setSubmitting] = useState(false);

      // 수량 증가
      const inc = (id) =>
        setCartItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
        );

      // 수량 감소 (1 미만으로 내려가지 않도록 제한)
      const dec = (id) =>
        setCartItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, qty: Math.max(it.qty - 1, 1) } : it))
        );

      // 항목 삭제
      const removeItem = (id) =>
        setCartItems((prev) => prev.filter((it) => it.id !== id));

      // 옵션 토글
      const toggleOpt = (key) =>
        setOpts((prev) => ({ ...prev, [key]: !prev[key] }));

      // 결제 가능 여부를 계산
      const canSubmit = cartItems.length > 0 && formErrors.length === 0 && !submitting;

      // 결제 처리 함수
      const pay = async () => {
        // 결제 불가 상태면 종료
        if (!canSubmit) return;

        setSubmitting(true);

        // 결제 대기 시뮬레이션
        await new Promise((r) => setTimeout(r, 10));

        alert("결제 완료");
        setSubmitting(false);
      };

      // Context Provider로 테스트용 상태/함수 전달
      return (
        <TravelContext.Provider
          value={{
            cartItems, setCartItems,
            opts, toggleOpt,
            inc, dec, removeItem,
            form, setForm,
            formErrors, setFormErrors,
            submitting, setSubmitting,
            canSubmit,
            pay,
          }}
        >
          {children}
        </TravelContext.Provider>
      );
    }

    // MemoryRouter로 라우팅 환경을 가짜로 구성하여 CheckoutPage 렌더링
    render(
      <MemoryRouter>
        <MockProvider>
          <CheckoutPage />
        </MockProvider>
      </MemoryRouter>
    );

    // 옵션 선택 테스트

    // 옵션 섹션을 찾고, "여행자 보험" 버튼 클릭
    const optSection = screen.getByText("추가 옵션").closest("section");
    await user.click(within(optSection).getByText("여행자 보험"));

    // 장바구니 수량 증가

    // 장바구니 섹션에서 "+" 버튼 클릭
    const cartSection = screen.getByText("선택한 여행 상품").closest("section");
    await user.click(within(cartSection).getByText("+"));

    // 폼 입력 검증

    // 이메일 입력창을 찾은 뒤 재입력하여 오류 없는 상태 유지
    const emailInput = screen.getByPlaceholderText(/example@email/i);
    await user.clear(emailInput);
    await user.type(emailInput, "aaa@bbb.com");

    // 결제 버튼 동작

    // 결제 버튼을 찾고 비활성화되지 않은 상태인지 검사
    const payBtn = screen.getByRole("button", { name: /결제하기/i });
    expect(payBtn).not.toBeDisabled();

    // 결제 버튼 클릭 시도
    await user.click(payBtn);

    // alert("결제 완료")가 호출되었는지 확인
    await waitFor(() =>
      expect(global.alert).toHaveBeenCalledWith("결제 완료")
    );
  });
});
