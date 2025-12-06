import React, { useMemo } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    ViewStyle,
    StyleProp,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native';
import Style from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeSwitcher } from '../../Hooks/useThemeSwitcher';


const isColorDark = (hexColor: string) => {
    // Remove #
    const color = hexColor.replace('#', '');
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);
    // Standard luminance formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 150; // return true if dark
};


const WrapperContainer: React.FC<WrapperContainerProps> = ({
    backgroundColor,
    children,
    useScroll = false,
    contentContainerStyle,
}) => {
    const { theme } = useThemeSwitcher();
    const insets = useSafeAreaInsets();
    const styles = Style(theme);
    const barStyle = useMemo(() => {
        return isColorDark(backgroundColor || theme.colors.background)
            ? 'light-content' : 'dark-content';
    }, [backgroundColor, theme.colors.background]);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{
                flex: 1,
                backgroundColor: backgroundColor || theme.colors.background,
                paddingTop: insets.top
            }}>
            <StatusBar
                translucent={true}
                backgroundColor={backgroundColor || theme.colors.background}
                barStyle={barStyle}
            />
            {useScroll ? (
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={contentContainerStyle}
                    style={styles.main}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>{children}</View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            ) : (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={[styles.main, contentContainerStyle]}>{children}</View>
                </TouchableWithoutFeedback>
            )}
        </KeyboardAvoidingView>
    );
};

export default React.memo(WrapperContainer);

interface WrapperContainerProps {
    backgroundColor?: string;
    children?: React.ReactNode;
    useScroll?: boolean;
    statusBarStyle?: 'light-content' | 'dark-content';
    statusBarBackgroundColor?: string;
    contentContainerStyle?: StyleProp<ViewStyle>;
}