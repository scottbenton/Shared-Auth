import { useContext } from "react";
import { ColorModeCookieProviderContext } from "./colorModeCookieContext";

export function useCookieColorMode() {
  return useContext(ColorModeCookieProviderContext);
}
