import {
    ActivityIndicator,
    StyleProp,
    Text,
    TouchableOpacity,
    TextStyle,
    ViewStyle
} from 'react-native'
import React from 'react'
import screenStyle from './style'
import { useThemeSwitcher } from '../../Hooks/useThemeSwitcher'
const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    containerStyle,
    titleTextStyle,
    onPress,
    disabled,
    loading,
}) => {
    const { theme } = useThemeSwitcher();
    const styles = screenStyle(theme);
    return (
        <TouchableOpacity
            style={[styles.container, containerStyle]}
            onPress={onPress} disabled={disabled}
            activeOpacity={0.8}
        >
            {loading ?
                <ActivityIndicator size="small" color={theme.colors.loader} />
                : <Text style={[styles.titleText, titleTextStyle]}>{title}</Text>}
        </TouchableOpacity>
    )
}

export default CustomButton

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    titleTextStyle?: StyleProp<TextStyle>;
}