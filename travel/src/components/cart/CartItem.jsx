import { krw } from "../../utils/format";

export default function CartItem({ item, onInc, onDec, onRemove }) {
  return (
    <div style={row}>
      <div>
        <div style={{ fontWeight: 500 }}>{item.title}</div>
        <div style={{ fontSize: 14, color: "#6b7280" }}>{krw(item.price)} / 1인</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={() => onDec(item.id)} style={btn}>-</button>
        <span style={{ width: 24, textAlign: "center" }}>{item.qty}</span>
        <button onClick={() => onInc(item.id)} style={btn}>+</button>
        <button onClick={() => onRemove(item.id)} style={{ ...btnText, color: "#dc2626" }}>삭제</button>
      </div>
    </div>
  );
}

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: "1px solid #f3f4f6",
};
const btn = { padding: "4px 10px", border: "1px solid #e5e7eb", borderRadius: 6, background: "#fff", cursor: "pointer" };
const btnText = { padding: "4px 8px", background: "transparent", border: "none", cursor: "pointer" };
