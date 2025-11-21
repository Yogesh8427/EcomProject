import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import colors from "./Colors";
import spacing from "./spacing";
import typography from "./typography";
import { AppTheme } from "./types";

const ThemeContext = createContext<{
    theme: AppTheme;
    toggleTheme: () => void;
}>({
    theme: {} as AppTheme,
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const systemColorScheme = Appearance.getColorScheme();
    const initialMode: "light" | "dark" = systemColorScheme === "dark" ? "dark" : "light";

    const [mode, setMode] = useState<"light" | "dark">(initialMode);

    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            setMode(colorScheme === "dark" ? "dark" : "light");
        });

        return () => listener.remove();
    }, []);

    const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

    const theme: AppTheme = {
        colors: mode === "light" ? colors.light : colors.dark,
        spacing,
        typography,
        mode,
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useAppTheme = () => useContext(ThemeContext);
