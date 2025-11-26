// 주문자 정보 입력 폼
// - 상태(form, setForm)는 부모에서 관리
// - errors: ["이름","연락처","이메일"] 같은 요약용 배열
// - invalids: { name: boolean, phone: boolean, email: boolean } 필드별 유효성
export default function CustomerForm({ form, setForm, errors = [], invalids = {} }) {
  return (
    <div>
      <Field
        label="이름 *"
        invalid={!!invalids.name}
        helper={invalids.name ? "이름을 입력해주세요." : ""}
      >
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="홍길동"
          style={inputStyle(invalids.name)}
          aria-invalid={invalids.name || undefined}
        />
      </Field>

      <Field
        label="연락처 *"
        invalid={!!invalids.phone}
        helper={invalids.phone ? "숫자만 11자리를 입력해주세요. (예: 010-1234-5678)" : ""}
      >
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="010-1234-5678"
          style={inputStyle(invalids.phone)}
          aria-invalid={invalids.phone || undefined}
        />
      </Field>

      <Field
        label="이메일 *"
        invalid={!!invalids.email}
        helper={invalids.email ? "이메일 형식이 올바르지 않습니다." : ""}
      >
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="example@email.com"
          style={inputStyle(invalids.email)}
          aria-invalid={invalids.email || undefined}
        />
      </Field>

      {/* 검증 실패 요약(선택) */}
      {errors.length > 0 && (
        <div
          style={{ color: "#dc2626", fontSize: 13, marginTop: 8 }}
          role="alert"
          aria-live="polite"
        >
          {`입력값 오류: ${errors.join(", ")}`}
        </div>
      )}
    </div>
  );
}

// 라벨 + 입력 + 보조문구
function Field({ label, invalid, helper, children }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 13, marginBottom: 4 }}>{label}</div>
      {children}
      {invalid && (
        <div style={{ color: "#dc2626", fontSize: 12, marginTop: 6 }}>
          {helper}
        </div>
      )}
    </div>
  );
}

// 공용 인풋 스타일 (유효/무효 테두리 색상)
const inputStyle = (invalid) => ({
  width: "100%",
  padding: "10px 12px",
  border: `1px solid ${invalid ? "#ef4444" : "#e5e7eb"}`,
  borderRadius: 8,
  outline: "none",
});
