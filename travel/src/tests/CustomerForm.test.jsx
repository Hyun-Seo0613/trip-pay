import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomerForm from "../components/checkout/CustomerForm";

// CustomerForm 컴포넌트에 대한 기본 렌더링 및 입력/검증 테스트
describe("CustomerForm Component", () => {
  // 입력 필드와 오류 메시지 출력 여부 검증
  test("renders inputs and validation errors", () => {
    // 초기 폼 값 (모두 빈 값)
    const form = { name: "", phone: "", email: "" };
    // 폼 오류 배열 (이름, 연락처, 이메일 오류)
    const errors = ["이름", "연락처", "이메일"];

    // CustomerForm 렌더링
    render(<CustomerForm form={form} setForm={vi.fn()} errors={errors} />);

    // 입력 필드 렌더링 확인 ----------------------------------------------------
    expect(screen.getByPlaceholderText(/홍길동/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/010-1234-5678/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/example@email.com/i)).toBeInTheDocument();

    // 오류 메시지 렌더링 확인
    errors.forEach((err) => {
      // 동일 텍스트가 여러 위치에서 나타날 수 있어 가장 마지막 요소를 검증
      const matches = screen.getAllByText(new RegExp(err, "i"));
      expect(matches[matches.length - 1]).toBeInTheDocument();
    });
  });

  // 입력이 변경되면 setForm이 호출되는지 검증
  test("input changes call setForm", async () => {
    const setForm = vi.fn(); // setForm을 mock 함수로 준비
    const form = { name: "", phone: "", email: "" };

    // 컴포넌트 렌더링
    render(<CustomerForm form={form} setForm={setForm} errors={[]} />);

    // 이름 입력창에 값 입력 시도
    await userEvent.type(screen.getByPlaceholderText(/홍길동/i), "홍길동");

    // setForm이 호출되었는지 확인
    expect(setForm).toHaveBeenCalled();
  });
});
