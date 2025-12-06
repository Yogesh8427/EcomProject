import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeSwitcher } from '../../Hooks/useThemeSwitcher'
import { styles } from './style'

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const { theme } = useThemeSwitcher()
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, {
            backgroundColor: theme.colors.background,
            paddingBottom: insets.bottom,
            borderTopColor: theme.colors.border,
        }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }

                const IconComponent = options.tabBarIcon
                const LabelComponent = options.tabBarLabel
                const badge = options.tabBarBadge

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        style={styles.tabButton}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconContainer}>
                            {IconComponent && typeof IconComponent === 'function' && (
                                (IconComponent as any)({ focused: isFocused })
                            )}
                            {badge && (
                                <View style={[styles.badge, { backgroundColor: theme.colors.secondary }]}>
                                    <Text style={styles.badgeText}>{badge}</Text>
                                </View>
                            )}
                        </View>
                        {LabelComponent && (
                            <View style={styles.labelContainer}>
                                {typeof LabelComponent === 'function' ? (
                                    (LabelComponent as any)({ focused: isFocused })
                                ) : (
                                    <Text style={[
                                        styles.label,
                                        {
                                            color: isFocused ? theme.colors.text : theme.colors.secondaryText,
                                        }
                                    ]}>
                                        {LabelComponent}
                                    </Text>
                                )}
                            </View>
                        )}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default CustomTabBar