import { StyleSheet } from "react-native";
import { AppTheme } from "../../Theme/types";

export default (theme?: AppTheme) => {
    const defaultTheme = {
        colors: {
            border: '#E0E0E0',
            primary: '#000000',
        }
    };

    const activeTheme = theme || defaultTheme;

    return StyleSheet.create({
        container: {
            flex: 1,
        },
        flatList: {
            flex: 1,
        },
        verticalContent: {
            flexGrow: 1,
        },
        paginationContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 16,
        },
        dot: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: activeTheme.colors.border || '#E0E0E0',
            marginHorizontal: 4,
        },
        activeDot: {
            width: 24,
            backgroundColor: activeTheme.colors.primary || '#000000',
        },
    })
};

