import type { ColorMode } from "@/components/ui/color-mode";
import { createContext } from "react";

interface ColorModeCookieProviderProps {
  colorMode: ColorMode | undefined;
  setColorMode: (mode: ColorMode) => void;
}
export const ColorModeCookieProviderContext =
  createContext<ColorModeCookieProviderProps>({
    colorMode: undefined,
    setColorMode: () => {},
  });
