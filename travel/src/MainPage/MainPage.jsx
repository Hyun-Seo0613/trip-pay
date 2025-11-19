import FilterBar from "./FilterBar";
import Product from "./Product";
import SearchBar from "./SearchBar";
import styled from "styled-components";

// 메인 페이지 구성 컴포넌트
// 검색바 → 필터바 → 상품 목록 순으로 배치
function MainPage() {
  return (
    <MainContainer>
      {/* 페이지 타이틀 */}
      <Title>Travel Product</Title>

      {/* 검색 기능 */}
      <div>
        <SearchBar />
      </div>

      {/* 필터 기능 (지역 / 가격 등) */}
      <div>
        <FilterBar />
      </div>

      {/* 상품 목록 */}
      <div>
        <Product />
      </div>
    </MainContainer>
  );
}

export default MainPage;

// 스타일 컴포넌트
const Title = styled.h1`
  text-align: center;
  color: black;
`;

// 전체 페이지 레이아웃 컨테이너
const MainContainer = styled.div`
  width: 100%;
`;