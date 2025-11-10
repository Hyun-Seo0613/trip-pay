import { describe, test, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutPage from "./CheckoutPage";
import { waitFor } from "@testing-library/react";


afterEach(() => {
  vi.restoreAllMocks();
});

describe("CheckoutPage", () => {
  test("입력 3개 미입력 시 결제 버튼 비활성화", () => {
    render(<CheckoutPage />);
    const button = screen.getByRole("button", { name: /결제하기/i });
    expect(button).toBeDisabled();
  });

  test("모든 입력 완료 시 결제 버튼 활성화", () => {
    render(<CheckoutPage />);

    fireEvent.change(screen.getByPlaceholderText("홍길동"), {
      target: { value: "홍길동" },
    });
    fireEvent.change(screen.getByPlaceholderText("example@email.com"), {
      target: { value: "test@email.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("010-1234-5678"), {
      target: { value: "010-1234-5678" },
    });

    const button = screen.getByRole("button", { name: /결제하기/i });
    expect(button).toBeEnabled();
  });

  test("결제 성공 시 alert 호출", async () => {
  const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  vi.spyOn(Math, "random").mockReturnValue(0.9); // 성공 강제

  render(<CheckoutPage />);

  fireEvent.change(screen.getByPlaceholderText("홍길동"), { target: { value: "홍길동" } });
  fireEvent.change(screen.getByPlaceholderText("example@email.com"), {
    target: { value: "test@email.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("010-1234-5678"), {
    target: { value: "010-1234-5678" },
  });

  fireEvent.click(screen.getByRole("button", { name: /결제하기/i }));

  // alert 호출 기다리기
  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });
});


  test("결제 실패 시 에러 메시지 표시", async () => {
  vi.spyOn(Math, "random").mockReturnValue(0.1); // 실패 강제 (30% 이하)

  render(<CheckoutPage />);
  fireEvent.change(screen.getByPlaceholderText("홍길동"), { target: { value: "홍길동" } });
  fireEvent.change(screen.getByPlaceholderText("example@email.com"), {
    target: { value: "test@email.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("010-1234-5678"), {
    target: { value: "010-1234-5678" },
  });

  fireEvent.click(screen.getByRole("button", { name: /결제하기/i }));

  const errorEl = await screen.findByRole("alert");
  expect(errorEl).toHaveTextContent(/결제 중 오류/i);
});

});
