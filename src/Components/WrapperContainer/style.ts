import { StyleSheet } from "react-native";
import { AppTheme } from "../../Theme/types";

export default function Style(theme: AppTheme) {
    return StyleSheet.create({
        main: {
            flex: 1,
            paddingHorizontal: theme.spacing.md,
        },
    });
}