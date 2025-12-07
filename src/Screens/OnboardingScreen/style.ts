import { StyleSheet } from "react-native";
import { AppTheme } from "../../Theme/types";
import { SCREEN_WIDTH } from "../../Constants/dimensions";

export default (theme: AppTheme) => {
    return StyleSheet.create({
        outerContainer: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        contentContainer: {
            flex: 1,
        },
        carouselContainer: {
            flex: 1,
        },
        itemContainer: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: theme.spacing.md,
        },
        imageContainer: {
            width: SCREEN_WIDTH,
            flexGrow: 1,
            flexShrink: 1,
            minHeight: 250,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: '100%',
            height: '100%',
        },
        textContainer: {
            width: '100%',
            paddingHorizontal: theme.spacing.lg,
            paddingTop: theme.spacing.xl,
            paddingBottom: theme.spacing.md,
            flexShrink: 0,
        },
        title: {
            fontSize: theme.typography.xxxl,
            fontWeight: 'bold',
            marginBottom: theme.spacing.md,
            textAlign: 'center',
            color: theme.colors.text,
        },
        description: {
            fontSize: theme.typography.md,
            textAlign: 'center',
            color: theme.colors.secondaryText,
            lineHeight: theme.typography.md * 1.5,
        },
        paginationContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: theme.spacing.lg,
        },
        dot: {
            width: theme.spacing.sm,
            height: theme.spacing.sm,
            borderRadius: 4,
            backgroundColor: theme.colors.border,
            marginHorizontal: theme.spacing.xs,
        },
        activeDot: {
            width: theme.spacing.xl,
            backgroundColor: theme.colors.primary,
        },
        buttonContainer: {
            flexDirection: 'row',
            paddingHorizontal: theme.spacing.md,
            paddingBottom: theme.spacing.xl,
        },
        skipButton: {
            flex: 1,
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: theme.colors.border,
        },
        skipButtonText: {
            color: theme.colors.secondaryText,
        },
        nextButton: {
            flex: 2,
        },
    })
};