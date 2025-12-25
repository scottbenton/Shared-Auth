"use client";

import type { IconButtonProps, SpanProps } from "@chakra-ui/react";
import { ClientOnly, IconButton, Skeleton, Span } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import React, { useCallback } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import {
  ColorModeCookieProvider,
  useCookieColorMode,
} from "@/context/ColorModeCookieProvider";

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ColorModeCookieProvider>
      <ColorModeInner {...props} />
    </ColorModeCookieProvider>
  );
}

function ColorModeInner(props: ThemeProviderProps) {
  const { forcedTheme: propsForcedTheme, ...otherProps } = props;

  const { colorMode } = useCookieColorMode();
  const forcedTheme = propsForcedTheme ?? colorMode;

  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      {...otherProps}
      forcedTheme={forcedTheme}
    />
  );
}

export type ColorMode = "light" | "dark";

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { setColorMode: setCookieColorMode } = useCookieColorMode();
  const { resolvedTheme, setTheme, forcedTheme } = useTheme();
  const colorMode = forcedTheme || resolvedTheme;

  const setColorMode = useCallback(
    (mode: ColorMode) => {
      setTheme(mode);
      setCookieColorMode(mode);
    },
    [setTheme, setCookieColorMode],
  );
  const toggleColorMode = useCallback(() => {
    setColorMode(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setColorMode]);
  return {
    colorMode: colorMode as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

type ColorModeButtonProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: "5",
            height: "5",
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function LightMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme light"
        colorPalette="gray"
        colorScheme="light"
        ref={ref}
        {...props}
      />
    );
  },
);

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function DarkMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme dark"
        colorPalette="gray"
        colorScheme="dark"
        ref={ref}
        {...props}
      />
    );
  },
);
