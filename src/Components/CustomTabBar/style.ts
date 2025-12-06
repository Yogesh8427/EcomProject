import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingTop: 8,
        minHeight: 60,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 7,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    iconContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    labelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 2,
    },
    badge: {
        position: 'absolute',
        top: -8,
        right: -12,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
})