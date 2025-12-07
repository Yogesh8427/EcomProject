import { Image, Text, View, StatusBar } from 'react-native'
import React, { useRef, useState } from 'react'
import { CustomButton, Carousel, CarouselRef } from '../../Components/AllComponents'
import imagePaths from '../../Constants/imagepaths'
import screenStyles from './style'
import { useThemeSwitcher } from '../../Hooks/useThemeSwitcher'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { isColorDark } from '../../Functions/helperFunctions'

interface OnboardingItem {
    id: number;
    title: string;
    description: string;
    image: any;
}

const dummyData: OnboardingItem[] = [
    {
        id: 1,
        title: 'we are here to help you',
        description: 'we are here to help you with your needs. one of the best online shopping platform in the world. deliver your products to your doorstep.',
        image: imagePaths.onboarding2,
    },
    {
        id: 2,
        title: 'we are here to help you',
        description: 'we are here to help you with your needs. one of the best online shopping platform in the world. deliver your products to your doorstep.',
        image: imagePaths.onboarding2,
    },
]

const OnboardingScreen = () => {
    const { theme, toggleTheme } = useThemeSwitcher();
    const insets = useSafeAreaInsets();
    const styles = screenStyles(theme);
    const carouselRef = useRef<CarouselRef>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < dummyData.length - 1) {
            carouselRef.current?.scrollToNext();
        } else {
            console.log('Navigate to next screen');
        }
    }

    const renderCarouselItem = (item: OnboardingItem, index: number) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={item.image}
                        style={styles.image}
                        resizeMode='cover'
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={{ ...styles.outerContainer, paddingTop: insets.top }}>
            <StatusBar
                translucent={true}
                backgroundColor={theme.colors.background}
                barStyle={isColorDark(theme.colors.background) ? 'light-content' : 'dark-content'}
            />
            <View style={styles.contentContainer}>
                <Carousel
                    ref={carouselRef}
                    data={dummyData}
                    renderItem={renderCarouselItem}
                    keyExtractor={(item) => item.id.toString()}
                    showPagination={true}
                    onIndexChange={setCurrentIndex}
                    theme={theme}
                    containerStyle={styles.carouselContainer}
                    paginationStyle={styles.paginationContainer}
                    dotStyle={styles.dot}
                    activeDotStyle={styles.activeDot}
                />
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title={currentIndex === dummyData.length - 1 ? "Get Started" : "Next"}
                    onPress={handleNext}
                    disabled={false}
                    containerStyle={styles.nextButton}
                />
            </View>
        </View>
    )
}

export default OnboardingScreen
