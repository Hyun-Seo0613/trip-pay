import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OptionSelect from "../components/checkout/OptionSelect";

// OptionSelect 컴포넌트 테스트
describe("OptionSelect Component", () => {
  // 옵션 버튼 클릭 시 toggle 함수가 호출되는지 검증
  test("toggles options", async () => {
    // 초기 옵션 상태 (모두 비활성)
    const opts = { insurance: false, hotel: false, car: false };

    // 옵션 변경을 담당하는 mock 함수
    const toggle = vi.fn();

    // OptionSelect 렌더링
    render(<OptionSelect opts={opts} toggle={toggle} />);

    // 보험 옵션 버튼을 찾고 클릭
    const insuranceBtn = screen.getByText(/보험/i);

    // 유저가 클릭하도록 시뮬레이션
    await userEvent.click(insuranceBtn);

    // 클릭 시 toggle 함수가 호출되었는지 확인
    expect(toggle).toHaveBeenCalled();
  });
});
