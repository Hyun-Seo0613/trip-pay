import styled from "styled-components";
import { useTravelContext } from "../Context/useTravelContext";

// 상품 목록을 보여주는 메인 UI 컴포넌트
// 필터링된 데이터 리스트를 받아 카드 형식으로 렌더링
function Product() {
  const { filteredList, addItemToCart, cartError } = useTravelContext();

  return (
    <Container>
      {/* 장바구니 처리 중 발생한 에러 출력 */}
      {cartError && (
        <ErrorText>
          {cartError}
          {/* 새로고침하여 재시도 */}
          <RetryButton onClick={() => window.location.reload()}>다시 시도</RetryButton>
        </ErrorText>
      )}

      {/* 필터링된 상품 개수 표시 */}
      <ResultText>검색 결과: {filteredList.length}개 상품</ResultText>

      {/* 상품 그리드 리스트 */}
      <Grid>
        {filteredList.map((item) => (
          <Card key={item.id}>
            {/* 상품 이미지 */}
            <Image src={item.image} alt={item.title} />

            <CardContent>
              {/* 지역 태그 */}
              <Region>{item.region}</Region>

              {/* 상품명 */}
              <Title>{item.title}</Title>

              {/* 가격과 장바구니 버튼 */}
              <BottomRow>
                <Price>{item.price.toLocaleString()}원</Price>
                <CartButton onClick={() => addItemToCart(item)}>장바구니 담기</CartButton>
              </BottomRow>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

export default Product;

// 스타일 컴포넌트
const Container = styled.div`
  width: 100%;
`;

// 에러 메시지 출력 영역
const ErrorText = styled.p`
  color: red;
`;

// 에러 상황에서 재시도 버튼
const RetryButton = styled.button`
  margin-left: 8px;
  padding: 4px 8px;
  font-size: 13px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: #e5e5e5;
  }
`;

// 검색 결과 개수
const ResultText = styled.h4`
  margin-bottom: 20px;
  font-weight: 500;
  text-align: left;
  color: black;
`;

// 상품 카드 3열 그리드 배치
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

// 개별 상품 카드 스타일
const Card = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

// 상품 이미지
const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

// 카드 내부 텍스트 및 버튼 영역
const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// 지역 태그 스타일
const Region = styled.span`
  display: inline-block;
  background: #fff5ee;
  color: #555;
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 6px;
  width: fit-content;
`;

// 상품명
const Title = styled.span`
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  color: black;
`;

// 가격 + 버튼을 양쪽 정렬
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

// 가격 표시 텍스트
const Price = styled.span`
  color: #6a5ae0;
  font-weight: 600;
  font-size: 15px;
`;

// 장바구니 추가 버튼
const CartButton = styled.button`
  background: #0d0d0d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #333;
  }
`;