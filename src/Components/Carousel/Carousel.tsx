import { View, ViewStyle, StyleProp } from 'react-native'
import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withSpring, 
    interpolate,
    Extrapolation,
    SharedValue,
    useAnimatedScrollHandler,
    runOnJS
} from 'react-native-reanimated'
import { AppTheme } from '../../Theme/types'
import carouselStyles from './style'
import { SCREEN_WIDTH } from '../../Constants/dimensions'

export interface CarouselRef {
    scrollToIndex: (index: number, animated?: boolean) => void;
    scrollToNext: (animated?: boolean) => void;
    scrollToPrevious: (animated?: boolean) => void;
    getCurrentIndex: () => number;
}

export interface CarouselProps<T = any> {
    data: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    keyExtractor: (item: T, index: number) => string;
    showPagination?: boolean;
    paginationStyle?: StyleProp<ViewStyle>;
    dotStyle?: StyleProp<ViewStyle>;
    activeDotStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    onIndexChange?: (index: number) => void;
    initialIndex?: number;
    theme?: AppTheme;
    itemWidth?: number;
    horizontal?: boolean;
}

function CarouselComponent<T = any>(
    {
        data,
        renderItem,
        keyExtractor,
        showPagination = true,
        paginationStyle,
        dotStyle,
        activeDotStyle,
        containerStyle,
        contentContainerStyle,
        onIndexChange,
        initialIndex = 0,
        theme,
        itemWidth = SCREEN_WIDTH,
        horizontal = true,
    }: CarouselProps<T>,
    ref?: React.Ref<CarouselRef>
) {
    const flatListRef = useRef<Animated.FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const styles = carouselStyles(theme);

    // Single shared value that represents the active position (rubber band effect)
    const activePosition = useSharedValue(initialIndex);
    const scrollOffset = useSharedValue(initialIndex * itemWidth);

    // Real-time scroll handler to track scroll position
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            if (horizontal) {
                scrollOffset.value = event.contentOffset.x;
                // Calculate the active position based on scroll offset
                const calculatedPosition = scrollOffset.value / itemWidth;
                activePosition.value = calculatedPosition;
            } else {
                scrollOffset.value = event.contentOffset.y;
                const calculatedPosition = scrollOffset.value / itemWidth;
                activePosition.value = calculatedPosition;
            }
        },
    });

    // Animate the active position when currentIndex changes (for programmatic navigation)
    useEffect(() => {
        activePosition.value = withSpring(currentIndex, {
            damping: 20,
            stiffness: 200,
            mass: 0.5,
        });
    }, [currentIndex]);

    const handleIndexChange = (index: number) => {
        setCurrentIndex(index);
        onIndexChange?.(index);
    };

    useImperativeHandle(ref, () => ({
        scrollToIndex: (index: number, animated = true) => {
            if (index >= 0 && index < data.length) {
                flatListRef.current?.scrollToIndex({ index, animated });
                setCurrentIndex(index);
            }
        },
        scrollToNext: (animated = true) => {
            const nextIndex = currentIndex + 1;
            if (nextIndex < data.length) {
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated });
                setCurrentIndex(nextIndex);
            }
        },
        scrollToPrevious: (animated = true) => {
            const prevIndex = currentIndex - 1;
            if (prevIndex >= 0) {
                flatListRef.current?.scrollToIndex({ index: prevIndex, animated });
                setCurrentIndex(prevIndex);
            }
        },
        getCurrentIndex: () => currentIndex,
    }));

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const index = viewableItems[0].index || 0;
            handleIndexChange(index);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    const getItemLayout = (_: any, index: number) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index,
    });

    // Dot component that uses Reanimated hooks
    const PaginationDot = React.memo(({ 
        index, 
        activePosition, 
        baseColor, 
        activeColor, 
        isActive,
        dotStyle,
        activeDotStyle,
        styles
    }: {
        index: number;
        activePosition: SharedValue<number>;
        baseColor: string;
        activeColor: string;
        isActive: boolean;
        dotStyle?: StyleProp<ViewStyle>;
        activeDotStyle?: StyleProp<ViewStyle>;
        styles: any;
    }) => {
        // Animated style for the dot
        const animatedDotStyle = useAnimatedStyle(() => {
            const distance = Math.abs(activePosition.value - index);
            
            // Smooth width interpolation with easing curve
            // Active dot: 24px, Inactive: 8px
            const width = interpolate(
                distance,
                [0, 0.5, 1, 1.5],
                [24, 20, 12, 8],
                {
                    extrapolateLeft: Extrapolation.CLAMP,
                    extrapolateRight: Extrapolation.CLAMP,
                }
            );

            // Smooth scale interpolation - subtle scale effect
            const scale = interpolate(
                distance,
                [0, 0.5, 1, 1.5],
                [1.15, 1.08, 1.02, 1],
                {
                    extrapolateLeft: Extrapolation.CLAMP,
                    extrapolateRight: Extrapolation.CLAMP,
                }
            );

            // Smooth opacity interpolation - more gradual fade
            const opacity = interpolate(
                distance,
                [0, 0.3, 0.7, 1, 1.5],
                [1, 0.95, 0.8, 0.65, 0.5],
                {
                    extrapolateLeft: Extrapolation.CLAMP,
                    extrapolateRight: Extrapolation.CLAMP,
                }
            );

            return {
                width,
                transform: [{ scale }],
                opacity,
            };
        });

        // Animated style for the active color overlay
        const animatedOverlayStyle = useAnimatedStyle(() => {
            const distance = Math.abs(activePosition.value - index);
            
            // Smooth active color transition
            const activeColorOpacity = interpolate(
                distance,
                [0, 0.3, 0.6, 1],
                [1, 0.7, 0.3, 0],
                {
                    extrapolateLeft: Extrapolation.CLAMP,
                    extrapolateRight: Extrapolation.CLAMP,
                }
            );

            return {
                opacity: activeColorOpacity,
            };
        });

        // Animated borderRadius that scales with width
        const animatedBorderRadius = useAnimatedStyle(() => {
            const distance = Math.abs(activePosition.value - index);
            const width = interpolate(
                distance,
                [0, 0.5, 1, 1.5],
                [24, 20, 12, 8],
                {
                    extrapolateLeft: Extrapolation.CLAMP,
                    extrapolateRight: Extrapolation.CLAMP,
                }
            );
            return {
                borderRadius: width / 2,
            };
        });

        return (
            <Animated.View
                style={[
                    styles.dot,
                    {
                        height: 8,
                        backgroundColor: baseColor,
                        overflow: 'hidden',
                    },
                    animatedDotStyle,
                    animatedBorderRadius,
                    dotStyle,
                    isActive && activeDotStyle
                ]}
            >
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: activeColor,
                        },
                        animatedOverlayStyle,
                        animatedBorderRadius
                    ]}
                />
            </Animated.View>
        );
    });

    const renderPaginationDots = () => {
        if (!showPagination) return null;

        const activeTheme = theme || {
            colors: {
                border: '#E0E0E0',
                primary: '#000000',
            }
        };

        const baseColor = activeTheme.colors.border || '#E0E0E0';
        const activeColor = activeTheme.colors.primary || '#000000';

        return (
            <View style={[styles.paginationContainer, paginationStyle]}>
                {data.map((_, index) => (
                    <PaginationDot
                        key={index}
                        index={index}
                        activePosition={activePosition}
                        baseColor={baseColor}
                        activeColor={activeColor}
                        isActive={index === currentIndex}
                        dotStyle={dotStyle}
                        activeDotStyle={activeDotStyle}
                        styles={styles}
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <Animated.FlatList
                ref={flatListRef}
                data={data}
                renderItem={({ item, index }) => (
                    <View style={{ width: itemWidth }}>
                        {renderItem(item, index)}
                    </View>
                )}
                horizontal={horizontal}
                pagingEnabled={horizontal}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={keyExtractor}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                style={[styles.flatList, contentContainerStyle]}
                contentContainerStyle={horizontal ? undefined : styles.verticalContent}
                getItemLayout={horizontal ? getItemLayout : undefined}
                bounces={true}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                onScrollToIndexFailed={(info) => {
                    const wait = new Promise<void>((resolve) => setTimeout(resolve, 500));
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
            />
            {renderPaginationDots()}
        </View>
    );
}

const Carousel = forwardRef(CarouselComponent) as <T = any>(
    props: CarouselProps<T> & { ref?: React.Ref<CarouselRef> }
) => React.ReactElement;

export default Carousel;
