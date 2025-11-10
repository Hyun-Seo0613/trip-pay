//장바구니 아이템 리스트 렌더링 / 실제 데이터 변경은 CheckoutPage가 담당
import CartItem from "./CartItem";

export default function CartList({ items, onInc, onDec, onRemove }) {
  //비어있을때
  if (!items.length) return <div style={{ color: "#6b7280" }}>장바구니가 비었습니다.</div>;
  return (
    <div>
      {/* 각 아이템을 CartItem으로 위임 */}
      {items.map((it) => (
        <CartItem key={it.id} item={it} onInc={onInc} onDec={onDec} onRemove={onRemove} />
      ))}
    </div>
  );
}
