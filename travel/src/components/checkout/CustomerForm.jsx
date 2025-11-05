export default function CustomerForm({ form, setForm, errors }) {
  return (
    <div>
      <Field label="이름 *">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="홍길동"
          style={input}
        />
      </Field>
      <Field label="연락처 *">
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="010-1234-5678"
          style={input}
        />
      </Field>
      <Field label="이메일 *">
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="example@email.com"
          style={input}
        />
      </Field>

      {errors.length > 0 && (
        <div style={{ color: "#dc2626", fontSize: 13, marginTop: 8 }}>
          {errors.join(", ")} 를(을) 확인해주세요.
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) { 
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 13, marginBottom: 4 }}>{label}</div>
      {children}
    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  outline: "none",
};
