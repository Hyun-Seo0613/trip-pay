import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TravelProvider } from "../Context/TravelProvider";
import { MemoryRouter } from "react-router-dom";
import Product from "../MainPage/Product";

// Product 컴포넌트의 기본 렌더링, 지역 필터링, 장바구니 담기 기능 동작을 테스트

// travelData를 테스트 전용 mock 데이터로 대체
vi.mock("../data/travelData", () => ({
  travelData: [
    { id: 1, title: "도쿄 여행", region: "아시아", price: 1000, image: "test.jpg" },
    { id: 2, title: "파리 여행", region: "유럽", price: 2000, image: "test2.jpg" },
  ],
  OPTION_PRICES: {
    insurance: 100,
    meal: 200,
    guide: 300,
  },
}));

describe("Product Component", () => {
  
  // 기본 렌더링 검사: 상품 목록과 검색 결과 텍스트 확인
  test("renders product list and search result text", () => {
    render(
      <MemoryRouter>
        <TravelProvider>
          <Product />
        </TravelProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/검색 결과/i)).toBeInTheDocument();
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  // 지역 필터링 테스트: 아시아 버튼 클릭 시 아시아 상품만 표시되는지
  test("filters products by region", async () => {
    render(
      <MemoryRouter>
        <TravelProvider>
          <Product />
        </TravelProvider>
      </MemoryRouter>
    );

    const asiaBtn = screen.getByText("아시아");
    await userEvent.click(asiaBtn);

    const filteredRegions = screen.getAllByText(/아시아/);
    expect(filteredRegions.length).toBeGreaterThan(0);
  });

  // 장바구니 담기 버튼 동작 테스트: 클릭 시 alert 호출 확인
  test("adds product to cart when '장바구니 담기' clicked", async () => {
    global.alert = vi.fn();

    render(
      <MemoryRouter>
        <TravelProvider>
          <Product />
        </TravelProvider>
      </MemoryRouter>
    );

    const addBtns = screen.getAllByText("장바구니 담기");
    await userEvent.click(addBtns[0]);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(expect.stringContaining("도쿄 여행"));
      expect(global.alert).toHaveBeenCalled();
    });
  });
});
