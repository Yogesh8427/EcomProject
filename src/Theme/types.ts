export interface ThemeColors {
    background: string;
    text: string;
    card: string;
    border: string;
    primary: string;
    secondary: string;
    secondaryText: string;
    loader: string;
    buttonText: string;
}

export interface AppTheme {
    colors: ThemeColors;
    spacing: { [key: string]: number };
    typography: { [key: string]: number };
    mode: "light" | "dark";
}
