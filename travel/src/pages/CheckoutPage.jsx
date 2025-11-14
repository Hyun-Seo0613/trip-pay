// 주문/결제 페이지
import CartList from "../components/cart/CartList";
import OptionSelect from "../components/checkout/OptionSelect";
import OrderSummary from "../components/checkout/OrderSummary";
import CustomerForm from "../components/checkout/CustomerForm";
import { krw } from "../utils/format";
import { useTravelContext } from "../Context/useTravelContext";

export default function CheckoutPage() {
  const {
    cartItems,
    form,
    setForm,
    removeItem,
    total,
    inc,
    dec,
    opts,
    toggleOpt,
    itemsAmount,
    optionsAmount,
    submitting,
    canSubmit,
    pay,
    formErrors,
    cartError,
    checkoutError,
  } = useTravelContext();

  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>주문 · 결제 (MVP)</h1>

      <section style={box}>
        <div style={title}>선택한 여행 상품</div>
        <CartList items={cartItems} onInc={inc} onDec={dec} onRemove={removeItem} />
        {cartError && <p style={{ color: "red", fontSize: 14, marginTop: 8 }}>오류 발생: {cartError}</p>}
      </section>

      <section style={box}>
        <div style={title}>추가 옵션</div>
        <OptionSelect opts={opts} toggle={toggleOpt} />
      </section>

      <section style={box}>
        <div style={title}>결제 예정 금액</div>
        <OrderSummary itemsAmount={itemsAmount} optionsAmount={optionsAmount} />
      </section>

      <section style={box}>
        <div style={title}>주문자 정보</div>
        <CustomerForm form={form} setForm={setForm} errors={formErrors} />
      </section>

      <button disabled={!canSubmit} onClick={pay} style={{ ...btnPrimary, opacity: canSubmit ? 1 : 0.5 }}>
        {submitting ? "결제 중..." : `${krw(total)} 결제하기`}
      </button>

      {checkoutError && <p style={{ color: "red", fontSize: 14, marginTop: 8 }}>오류 발생: {checkoutError}</p>}
    </div>
  );
}

const box = { border: "1px solid #e5e7eb", borderRadius: 8, padding: 16, marginBottom: 16 };
const title = { fontWeight: 600, marginBottom: 8 };
const btnPrimary = {
  padding: "12px 16px",
  borderRadius: 10,
  background: "#111827",
  color: "#fff",
  fontWeight: 600,
  width: "100%",
  cursor: "pointer",
};
