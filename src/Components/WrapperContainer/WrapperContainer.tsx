import React from 'react';
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
import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WrapperContainer: React.FC<WrapperContainerProps> = ({
    backgroundColor = '#ffffff',
    children,
    useScroll = false,
    contentContainerStyle,
}) => {
    const insets = useSafeAreaInsets();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1, backgroundColor, paddingTop: insets.top }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                {useScroll ? (
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={contentContainerStyle}
                        style={[styles.main, contentContainerStyle]}>
                        {children}
                    </ScrollView>
                ) : (
                    <View style={[styles.main, contentContainerStyle]}>
                        {children}
                    </View>
                )}
            </TouchableWithoutFeedback>
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