import { useAppTheme } from "../Theme/ThemeProvider";

export const useThemeSwitcher = () => {
    const { theme, toggleTheme } = useAppTheme();
    return { theme, toggleTheme };
}
