import { useTheme } from "next-themes";

export function useCustomTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return {
    theme: resolvedTheme,
    setTheme,
    toggleTheme,
  };
}
