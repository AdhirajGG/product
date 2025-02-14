import { IconButton } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import React from "react";
import { useCustomTheme } from "@/hooks/useCustomTheme";

export function ColorModeButton(props) {
  const { theme, toggleTheme } = useCustomTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      variant="ghost"
      aria-label="Toggle theme"
      size="sm"
      {...props}
    >
      {theme === "dark" ? <LuMoon /> : <LuSun />}
    </IconButton>
  );
}
