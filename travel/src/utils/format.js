//숫자를 한국 돈 형태로 바꿔주는 함수 
// krw(15000) => W15,000 이런식으로... 원화표시 + 쉼표추가 

export const krw = (n) =>
  new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(n);
