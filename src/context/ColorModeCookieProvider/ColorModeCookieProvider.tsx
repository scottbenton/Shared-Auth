import { useCallback, useState, type PropsWithChildren } from "react";
import type { ColorMode } from "@/components/ui/color-mode";
import { ColorModeCookieProviderContext } from "./colorModeCookieContext";
import Cookies from "js-cookie";
import { COOKIE_DOMAIN } from "@/lib/cookieDomain";

const COOKIE_KEY = "scotts-apps-color-mode";

export function ColorModeCookieProvider(props: PropsWithChildren) {
  const { children } = props;

  const [cookieValue, setCookieValue] = useState<ColorMode | undefined>(
    getCookieColorMode(),
  );
  const setColorMode = useCallback((mode: ColorMode) => {
    setCookieValue(mode);
    setCookieColorMode(mode);
  }, []);

  return (
    <ColorModeCookieProviderContext.Provider
      value={{ colorMode: cookieValue, setColorMode }}
    >
      {children}
    </ColorModeCookieProviderContext.Provider>
  );
}

function getCookieColorMode(): ColorMode | undefined {
  const cookieValue = Cookies.get(COOKIE_KEY);
  if (cookieValue === "light") {
    return "light";
  } else if (cookieValue === "dark") {
    return "dark";
  }
  return undefined;
}

function setCookieColorMode(colorMode: ColorMode) {
  Cookies.set(COOKIE_KEY, colorMode, {
    domain: COOKIE_DOMAIN,
    expires: 365,
    sameSite: "Lax",
    secure: true,
  });
}
