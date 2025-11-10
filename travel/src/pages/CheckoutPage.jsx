// - 장바구니 상품 / 옵션 선택 / 주문자 정보 / 결제 로직을 모두 포함한 페이지
// - 입력값 검증 + 결제 성공/실패 처리 포함 (MVP 버전)
import React, { useMemo, useState } from "react";
import CartList from "../components/cart/CartList";
import OptionSelect from "../components/checkout/OptionSelect";
import OrderSummary from "../components/checkout/OrderSummary";
import CustomerForm from "../components/checkout/CustomerForm";
import { SEED_ITEMS, OPTION_PRICES } from "../data/products";
import { krw } from "../utils/format";

// 테스트 환경이면 delay = 0, 아니면 1200ms
const delay = import.meta.env.MODE === "test" ? 0 : 1200;

//  상태 관리: 장바구니, 옵션, 주문자 정보, 결제 상태, 오류 메시지

export default function CheckoutPage() {
  const [items, setItems] = useState(SEED_ITEMS);
  const [opts, setOpts] = useState({ insurance: true, hotel: false, car: false });
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const itemsAmount = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);

  const optionsAmount = useMemo(
    () =>
      (opts.insurance ? OPTION_PRICES.insurance : 0) +
      (opts.hotel ? OPTION_PRICES.hotel : 0) +
      (opts.car ? OPTION_PRICES.car : 0),
    [opts]
  );

  const total = itemsAmount + optionsAmount;

  const inc = (id) => setItems((arr) => arr.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
  const dec = (id) => setItems((arr) => arr.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it)));
  const removeItem = (id) => setItems((arr) => arr.filter((it) => it.id !== id));

  const toggleOpt = (k) => setOpts((o) => ({ ...o, [k]: !o[k] }));

// Validation
// 사용자 입력값 검증 (초간단 유효성 검사)
// - 이름: 필수
// - 연락처: 숫자 11자리
// - 이메일: 최소 형태 검사
  const errors = [];
  if (!form.name.trim()) errors.push("이름");
  const digits = form.phone.replace(/\D/g, "");
  if (digits.length !== 11) errors.push("연락처");
  if (!/.+@.+\..+/.test(form.email)) errors.push("이메일");

  const canSubmit = items.length > 0 && errors.length === 0 && !submitting;

// 결제 실행 함수
// - 중복 클릭 방지, 에러 초기화
// - 테스트 환경: delay = 0ms / 실제: 1200ms
// - 30% 확률로 결제 실패 시뮬레이션

  const pay = async () => {
    if (!canSubmit) return;

    setSubmitting(true);
    setErrorMsg(""); // 이전 에러 초기화

    try {
      const idempotencyKey = crypto.getRandomValues(new Uint32Array(4)).join("-");

      await new Promise((resolve) => setTimeout(resolve, delay));

      // 30% 확률로 실패
      if (Math.random() < 0.3) {
        throw new Error("PG 결제 실패");
      }

      setSubmitting(false);
      alert(
        `결제가 완료되었습니다.\n주문번호: ORD-${Math.random()
          .toString(36)
          .slice(2, 8)
          .toUpperCase()}\n키: ${idempotencyKey}`
      );

      setItems([]);
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      setErrorMsg("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // UI 구성: 상품 목록 → 옵션 선택 → 금액 요약 → 주문자 정보 → 결제 버튼
  return (
    <div style={{ maxWidth: 1024, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>주문 · 결제 (MVP)</h1>

      {errorMsg && (
        <div role="alert" style={{ color: "#dc2626", marginBottom: 12, fontWeight: 600 }}>
          {errorMsg}
        </div>
      )}

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
