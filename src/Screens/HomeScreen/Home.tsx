import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useThemeSwitcher } from '../../Hooks/useThemeSwitcher'
import { WrapperContainer } from '../../Components/AllComponents'
import styles from './style'
import HomeIcon from '../../Assets/images/home.svg'
import CartIcon from '../../Assets/images/cart.svg'
import OrderIcon from '../../Assets/images/bag.svg'
import ProfileIcon from '../../Assets/images/person.svg'

const Home = () => {
    const { theme, toggleTheme } = useThemeSwitcher();
    return (
        <WrapperContainer
            useScroll={true}
        >
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.colors.text }]}>
                    Theme Test Screen
                </Text>
                <Text style={[styles.subtitle, { color: theme.colors.text }]}>
                    Current Mode: {theme.mode.toUpperCase()}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.toggleButton, { backgroundColor: theme.colors.primary }]}
                onPress={toggleTheme}
            >
                <Text style={[styles.toggleButtonText, { color: '#FFFFFF' }]}>
                    Toggle Theme
                </Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Theme Colors
                </Text>

                <View style={[styles.colorCard, { backgroundColor: theme.colors.card }]}>
                    <Text style={[styles.colorLabel, { color: theme.colors.text }]}>
                        Card Background
                    </Text>
                </View>

                <View style={[styles.colorCard, { backgroundColor: theme.colors.primary }]}>
                    <Text style={[styles.colorLabel, { color: '#FFFFFF' }]}>
                        Primary Color
                    </Text>
                </View>

                <View style={[styles.colorCard, { backgroundColor: theme.colors.secondary }]}>
                    <Text style={[styles.colorLabel, { color: '#FFFFFF' }]}>
                        Secondary Color
                    </Text>
                </View>

                <View style={[styles.colorCard, {
                    backgroundColor: theme.colors.border,
                    borderWidth: 2,
                    borderColor: theme.colors.border
                }]}>
                    <Text style={[styles.colorLabel, { color: theme.colors.text }]}>
                        Border Color
                    </Text>
                </View>
            </View>
        </WrapperContainer>
    )
}

export default Home
