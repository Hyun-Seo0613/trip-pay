// 옵션 선택 컴포넌트 / 옵션상태는 부모에서 관리하고 여기서는 UI + 클릭이벤트만 처리하도록
import { krw } from "../../utils/format";
import { OPTION_PRICES } from "../../data/travelData";

export default function OptionSelect({ opts, toggle }) {
  return (
    <div>
      <OptionRow label="여행자 보험" price={OPTION_PRICES.insurance} checked={opts.insurance} onClick={() => toggle("insurance")} />
      <OptionRow label="호텔 업그레이드" price={OPTION_PRICES.hotel} checked={opts.hotel} onClick={() => toggle("hotel")} />
      <OptionRow label="전용 차량" price={OPTION_PRICES.car} checked={opts.car} onClick={() => toggle("car")} />
    </div>
  );
}

//옵션 하나를 화면에 그려주는  UI 컴포넌트
function OptionRow({ label, price, checked, onClick }) {
  return (
    <div onClick={onClick} style={row}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" readOnly checked={checked} />
        <span>{label}</span>
      </div>
      <span style={{ fontSize: 14 }}>{krw(price)}</span>
    </div>
  );
}

// 클릭 가능한 옵션 Row 스타일 
const row = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", cursor: "pointer" };
