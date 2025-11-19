import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styled from "styled-components";
import { useTravelContext } from "../Context/useTravelContext";

// 필터 UI(카테고리 + 가격 슬라이더)를 제공하는 컴포넌트
function FilterBar() {
  const { filters, setFilters, REGIONS } = useTravelContext(); // 전역 필터 상태 불러오기

  return (
    <FilterBarContainer>
      {/* 지역 카테고리 선택 버튼 */}
      <CategoryContainer>
        <CategoryText>카테고리</CategoryText>
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => setFilters((prev) => ({ ...prev, region: r }))} // 클릭 시 지역 필터 변경
            style={{
              padding: "8px 15px",
              marginRight: "10px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              background: filters.region === r ? "#111" : "#fff", // 선택된 지역은 검은 배경
              color: filters.region === r ? "#fff" : "#111", // 선택된 지역은 흰 글자
              cursor: "pointer",
            }}
          >
            {r}
          </button>
        ))}
      </CategoryContainer>

      {/* 가격 범위 슬라이더 */}
      <PriceContainer>
        <PriceTextWrapper>
          <h4>가격 범위</h4>
          <PriceText>
            {filters.priceRange[0].toLocaleString()}원 〜 {filters.priceRange[1].toLocaleString()}원
          </PriceText>
        </PriceTextWrapper>

        <Slider
          range // 두 개의 핸들(최소~최대)
          min={0}
          max={20000}
          step={1000}
          value={filters.priceRange} // 현재 선택된 가격 범위 표시
          onChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))} // 가격 범위 변경
          trackStyle={[{ backgroundColor: "#000" }]} // 슬라이더 채워진 구간 색
          handleStyle={[
            // 핸들 스타일 두 개 (시작점/끝점)
            { borderColor: "#000", height: 20, width: 20, backgroundColor: "#fff" },
            { borderColor: "#000", height: 20, width: 20, backgroundColor: "#fff" },
          ]}
          railStyle={{ backgroundColor: "#ddd" }} // 기본 레일 색상
        />
      </PriceContainer>
    </FilterBarContainer>
  );
}

export default FilterBar;

// 스타일 컴포넌트
const FilterBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff5ee;
  padding: 0 25px;
  margin-top: 20px;
  border-radius: 12px;
`;

const CategoryContainer = styled.div`
  margin-bottom: 20px;
  margin-right: 100px;
  color: black;
`;

const CategoryText = styled.h4`
  text-align: left;
`;

// 가격 슬라이더 컨테이너
const PriceContainer = styled.div`
  margin-bottom: 30px;
  color: black;
  width: 800px;
  flex-shrink: 0;
`;

const PriceText = styled.div`
  margin-bottom: 10px;
`;

const PriceTextWrapper = styled.div`
  text-align: left;
`;