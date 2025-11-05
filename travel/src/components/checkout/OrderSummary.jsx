import { krw } from "../../utils/format";
//결제금액
export default function OrderSummary({ itemsAmount, optionsAmount }) {
  const total = itemsAmount + optionsAmount;
  return (
    <div>
      <Row label="상품 금액" value={krw(itemsAmount)} />
      <Row label="옵션 금액" value={krw(optionsAmount)} />
      <hr style={{ margin: "12px 0", border: "none", borderTop: "1px solid #f3f4f6" }} />
      <Row label={<b>총 결제금액</b>} value={<b>{krw(total)}</b>} />
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "4px 0" }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
