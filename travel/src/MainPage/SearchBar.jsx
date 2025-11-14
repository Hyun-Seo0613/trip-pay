// SearchBar 컴포넌트
// 검색창, 장바구니 버튼, 키워드 입력 필드로 구성된 상단 UI

import styled from "styled-components";
import { useTravelContext } from "../Context/useTravelContext";

// 검색 아이콘 SVG 컴포넌트
const SearchSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
      fill="#1D1B20"
    />
  </svg>
);

// 장바구니 아이콘 SVG 컴포넌트
const CartSvg = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 2H10L15.36 28.78C15.5429 29.7008 16.0438 30.5279 16.7751 31.1166C17.5064 31.7053 18.4214 32.018 19.36 32H38.8C39.7386 32.018 40.6536 31.7053 41.3849 31.1166C42.1162 30.5279 42.6171 29.7008 42.8 28.78L46 12H12M20 42C20 43.1046 19.1046 44 18 44C16.8954 44 16 43.1046 16 42C16 40.8954 16.8954 40 18 40C19.1046 40 20 40.8954 20 42ZM42 42C42 43.1046 41.1046 44 40 44C38.8954 44 38 43.1046 38 42C38 40.8954 38.8954 40 40 40C41.1046 40 42 40.8954 42 42Z"
      stroke="#1E1E1E"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 검색창 컴포넌트
function SearchBar() {
  // 필터 상태, 장바구니 수량, 페이지 이동 함수 가져오기
  const { filters, setFilters, cartCount, goToCheckoutPage } = useTravelContext();

  // 검색창 플레이스홀더 텍스트
  const placeholderText = "여행지를 검색하세요. (예: 도쿄, 파리, 런던)";

  return (
    <SearchBarContainer>
      {/* 상단: 제목 + 장바구니 버튼 */}
      <Header>
        <Title>여행 상품 검색</Title>

        {/* 장바구니 버튼: 클릭 시 Checkout 페이지로 이동 */}
        <CartButton onClick={goToCheckoutPage}>
          <CartIcon />
          {cartCount}개
        </CartButton>
      </Header>

      {/* 검색 입력 영역 */}
      <SearchInputWrapper>
        {/* 돋보기 아이콘 */}
        <SearchIcon />

        {/* 키워드 입력 필드 */}
        <Input
          type="text"
          placeholder={placeholderText}
          value={filters.keyword}
          onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))}
        />
      </SearchInputWrapper>
    </SearchBarContainer>
  );
}

export default SearchBar;

// 스타일 컴포넌트

// 전체 검색창 컨테이너
const SearchBarContainer = styled.div`
  padding: 10px;
`;

// 상단 제목 + 장바구니 버튼 영역
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

// 제목 텍스트
const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

// 장바구니 버튼
const CartButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #f0f4ff;
  border: none;
  border-radius: 20px;
  color: #3f6ff0;
  font-size: 14px;
  cursor: pointer;

  svg {
    margin-right: 5px;
    font-size: 20px;
  }
`;

// 검색 입력 필드를 감싸는 박스
const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  height: 40px;
`;

// 실제 텍스트 입력 필드
const Input = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  color: #333;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #b0b0b0;
  }
`;

// 검색 아이콘 스타일
const SearchIcon = styled(SearchSvg)`
  margin-right: 10px;
`;

// 장바구니 아이콘 스타일
const CartIcon = styled(CartSvg)`
  width: 100%;
  height: 100%;
`;
