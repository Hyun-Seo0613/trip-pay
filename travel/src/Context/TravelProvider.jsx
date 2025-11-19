// TravelProvider: 여행 상품 장바구니, 옵션, 필터, 결제 상태 등을 전역에서 관리하는 컨텍스트
import { travelData, OPTION_PRICES } from "../data/travelData";
import { useState, useMemo } from "react";
import { TravelContext } from "./TravelContext";
import { useNavigate } from "react-router-dom";

// 지역 선택용 상수
const REGIONS = ["전체", "아시아", "유럽", "북미", "오세아니아"];

export function TravelProvider({ children }) {
  // 장바구니 목록
  const [cartItems, setCartItems] = useState([]);

  // 추가 옵션(보험/호텔/렌트카)
  const [opts, setOpts] = useState({ insurance: false, hotel: false, car: false });

  // 결제 폼 정보
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  // 결제 진행 여부
  const [submitting, setSubmitting] = useState(false);

  // 장바구니 관련 에러
  const [cartError, setCartError] = useState(null);

  // 결제 관련 에러
  const [checkoutError, setCheckoutError] = useState(null);

  // 검색/필터 상태
  const [filters, setFilters] = useState({
    keyword: "",
    region: "전체",
    priceRange: [0, 20000],
  });

  // 수량 증가
  const inc = async (id) => {
    try {
      setCartError(null);
      await new Promise((resolve) => setTimeout(resolve, 300)); // API 대기 시뮬레이션
      setCartItems((arr) => arr.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it)));
    } catch (err) {
      setCartError(err.message);
    }
  };

  // 수량 감소 (최소 1)
  const dec = async (id) => {
    try {
      setCartError(null);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCartItems((arr) => arr.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it)));
    } catch (err) {
      setCartError(err.message);
    }
  };

  // 장바구니 상품 삭제
  const removeItem = async (id) => {
    try {
      setCartError(null);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCartItems((arr) => arr.filter((it) => it.id !== id));
    } catch (err) {
      setCartError(err.message);
    }
  };

  // 장바구니에 상품 추가
  const addItemToCart = async (item) => {
    try {
      setCartError(null);
      await new Promise((resolve) => setTimeout(resolve, 500));

      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);

        if (existingItemIndex > -1) {
          // 이미 있으면 수량 +1
          return prevItems.map((i, index) =>
            index === existingItemIndex ? { ...i, qty: i.qty + 1 } : i
          );
        } else {
          // 없으면 새로 추가
          return [...prevItems, { ...item, qty: 1 }];
        }
      });

      alert(`${item.title}이(가) 장바구니에 추가되었습니다`);
    } catch (err) {
      console.error(err);
      setCartError(err.message);
      alert(`장바구니 추가 실패 : ${err.message}`);
    }
  };

  // 장바구니 전체 수량 계산
  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems]);

  // 장바구니 페이지로 이동
  const navigate = useNavigate();
  const goToCheckoutPage = () => {
    navigate("/checkout");
  };

  // 검색/필터링된 상품 목록 생성
  const filteredList = useMemo(() => {
    const keywordIsRegion = REGIONS.includes(filters.keyword);

    return (
      travelData
        .filter((item) => {
          // 키워드가 지역이면 그 지역만 필터
          if (keywordIsRegion) return item.region === filters.keyword;
          // 선택된 지역 필터
          return filters.region === "전체" || item.region === filters.region;
        })
        // 가격 범위 필터
        .filter((item) => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1])
        // 일반 키워드 검색 (지역 키워드일 땐 건너뜀)
        .filter((item) => {
          if (keywordIsRegion) return true;
          return item.title.toLowerCase().includes(filters.keyword.toLowerCase());
        })
    );
  }, [filters]);

  // 옵션 선택 토글
  const toggleOpt = (k) => setOpts((o) => ({ ...o, [k]: !o[k] }));

  // 장바구니 상품 금액 합계
  const itemsAmount = useMemo(() => {
    return cartItems?.reduce((sum, it) => sum + it.price * it.qty, 0) || 0;
  }, [cartItems]);

  // 옵션 금액 합계
  const optionsAmount = useMemo(() => {
    const insurance = opts.insurance ? OPTION_PRICES.insurance : 0;
    const hotel = opts.hotel ? OPTION_PRICES.hotel : 0;
    const car = opts.car ? OPTION_PRICES.car : 0;
    return insurance + hotel + car;
  }, [opts]);

  // 총 결제 금액
  const total = itemsAmount + optionsAmount;

  // 기본적인 입력 검증
  const formErrors = useMemo(() => {
    const errors = [];
    if (!form.name.trim()) errors.push("이름");

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length !== 11) errors.push("연락처");

    if (!/.+@.+\..+/.test(form.email)) errors.push("이메일");

    return errors;
  }, [form]);

  // 제출 가능 여부 판단
  const canSubmit = useMemo(() => {
    return cartItems.length > 0 && formErrors.length === 0 && !submitting;
  }, [cartItems, formErrors, submitting]);

  // 더미 결제 처리
  const pay = async () => {
    if (!canSubmit) return;
    try {
      setCheckoutError(null);
      setSubmitting(true);

      // 멱등성 키 생성 (결제 API 시뮬레이션)
      const idempotencyKey = crypto.getRandomValues(new Uint32Array(4)).join("-");

      await new Promise((r) => setTimeout(r, 1200)); // 결제 대기 시뮬레이션
      setSubmitting(false);

      alert(
        `결제가 완료되었습니다.\n주문번호: ORD-${Math.random()
          .toString(36)
          .slice(2, 8)
          .toUpperCase()}\n키: ${idempotencyKey}`
      );

      // 상태 초기화
      setCartItems([]);
      setOpts({ insurance: false, hotel: false, car: false });
      setForm({ name: "", phone: "", email: "" });
    } catch (err) {
      console.error(err);
      setCheckoutError(err.message);
      alert(`결제 실패: ${err.message}`);
    }
  };

  // 컨텍스트에 제공할 값
  const contextValue = {
    cartItems,
    setCartItems,
    addItemToCart,
    removeItem,
    cartCount,
    goToCheckoutPage,
    inc,
    dec,

    itemsAmount,
    optionsAmount,
    filteredList,
    total,

    OPTION_PRICES,
    opts,
    toggleOpt,
    REGIONS,

    filters,
    setFilters,

    form,
    setForm,
    submitting,
    setSubmitting,
    canSubmit,

    formErrors,
    cartError,
    checkoutError,

    pay,
  };

  return <TravelContext.Provider value={contextValue}>{children}</TravelContext.Provider>;
}
