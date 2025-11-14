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

const row = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", cursor: "pointer" };
