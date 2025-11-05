// 주문/결제 페이지
import React, { useMemo, useState } from "react";
import CartList from "../components/cart/CartList";
import OptionSelect from "../components/checkout/OptionSelect";
import OrderSummary from "../components/checkout/OrderSummary";
import CustomerForm from "../components/checkout/CustomerForm";
//상품 더미데이터(장바구니에 기본적으로 들어있는 상품 리스트)와 옵션(보험,호텔,차량) 가격표 가져오는 코드
import { SEED_ITEMS, OPTION_PRICES } from "../data/products";
import { krw } from "../utils/format";

export default function CheckoutPage() {
  const [items, setItems] = useState(SEED_ITEMS);
  const [opts, setOpts] = useState({ insurance: true, hotel: false, car: false });
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);

  // 금액 합계
  const itemsAmount = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);
  const optionsAmount = useMemo(
    () =>
      (opts.insurance ? OPTION_PRICES.insurance : 0) +
      (opts.hotel ? OPTION_PRICES.hotel : 0) +
      (opts.car ? OPTION_PRICES.car : 0),
    [opts]
  );
  const total = itemsAmount + optionsAmount;

  // 수량/삭제
  const inc = (id) => setItems((arr) => arr.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
  const dec = (id) => setItems((arr) => arr.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it)));
  const removeItem = (id) => setItems((arr) => arr.filter((it) => it.id !== id));

  // 옵션 토글
  const toggleOpt = (k) => setOpts((o) => ({ ...o, [k]: !o[k] }));

  // 초간단 검사
  // 정규표현식 사용
  // ---- 초간단 검사 (심플 버전) ----
const errors = [];
if (!form.name.trim()) errors.push("이름");

// 연락처: 숫자만 11자리 검사
const digits = form.phone.replace(/\D/g, "");
if (digits.length !== 11) errors.push("연락처");

// 이메일 초간단 검사
if (!/.+@.+\..+/.test(form.email)) errors.push("이메일");

const canSubmit = items.length > 0 && errors.length === 0 && !submitting;

  // 더미 결제
  const pay = async () => {
    if (!canSubmit) return;
    setSubmitting(true);

    const idempotencyKey = crypto.getRandomValues(new Uint32Array(4)).join("-");
    // TODO: 실서버 연동시: /orders/preview -> PG -> /orders/confirm 로 교체

    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);

    alert(
      `결제가 완료되었습니다.\n주문번호: ORD-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}\n키: ${idempotencyKey}`
    );
    setItems([]); // 장바구니 비우기
  };

  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>주문 · 결제 (MVP)</h1>

      <section style={box}>
        <div style={title}>선택한 여행 상품</div>
        <CartList items={items} onInc={inc} onDec={dec} onRemove={removeItem} />
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
        <CustomerForm form={form} setForm={setForm} errors={errors} />
      </section>

      <button disabled={!canSubmit} onClick={pay} style={{ ...btnPrimary, opacity: canSubmit ? 1 : 0.5 }}>
        {submitting ? "결제 중..." : `${krw(total)} 결제하기`}
      </button>

      <p style={{ color: "#6b7280", fontSize: 12, marginTop: 8 }}>
        • 현재는 더미 결제입니다. 회의 후 PG/서버 검증 추가 예정.
      </p>
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
