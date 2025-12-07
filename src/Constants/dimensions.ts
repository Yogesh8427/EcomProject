import { Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export const SCREEN_WIDTH = windowDimensions.width;
export const SCREEN_HEIGHT = windowDimensions.height;
export const SCREEN_SCALE = windowDimensions.scale;
export const SCREEN_FONT_SCALE = windowDimensions.fontScale;

export const WINDOW_WIDTH = windowDimensions.width;
export const WINDOW_HEIGHT = windowDimensions.height;

export const SCREEN_SCREEN_WIDTH = screenDimensions.width;
export const SCREEN_SCREEN_HEIGHT = screenDimensions.height;

// Helper function to get responsive dimensions
export const getResponsiveWidth = (percentage: number): number => {
    return (SCREEN_WIDTH * percentage) / 100;
};

export const getResponsiveHeight = (percentage: number): number => {
    return (SCREEN_HEIGHT * percentage) / 100;
};

// Common dimension values
export const DIMENSIONS = {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    SCALE: SCREEN_SCALE,
    FONT_SCALE: SCREEN_FONT_SCALE,
} as const;

export default DIMENSIONS;

