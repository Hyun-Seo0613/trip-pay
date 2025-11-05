import CartItem from "./CartItem";

export default function CartList({ items, onInc, onDec, onRemove }) {
  if (!items.length) return <div style={{ color: "#6b7280" }}>장바구니가 비었습니다.</div>;
  return (
    <div>
      {items.map((it) => (
        <CartItem key={it.id} item={it} onInc={onInc} onDec={onDec} onRemove={onRemove} />
      ))}
    </div>
  );
}
