import { StyleSheet } from "react-native";
import { AppTheme } from "../../Theme/types";

export default (theme: AppTheme) => {
    return StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            padding: theme.spacing.md,
            borderRadius: theme.spacing.xl,
        },
        titleText: {
            color: theme.colors.buttonText,
            fontSize: theme.typography.md,
            fontWeight: 'bold',
            textAlign: 'center',
        }
    })
}