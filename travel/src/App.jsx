import CheckoutPage from "./pages/CheckoutPage";
import MainPage from "./MainPage/MainPage";
import { TravelProvider } from "./Context/TravelProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <TravelProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </TravelProvider>
    </BrowserRouter>
  );
}
