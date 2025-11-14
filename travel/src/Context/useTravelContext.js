import { useContext } from "react";
import { TravelContext } from "./TravelContext.js";

export function useTravelContext() {
  return useContext(TravelContext);
}
