// Theme definitions for the app

// Dark theme (default)
export const darkTheme = {
  dark: true,
  colors: {
    primary: '#FFFEE3', // Font Share Text/Logo/Button
    secondary: '#8B5CF6', // Purple
    accent: '#10B981', // Emerald
    background: '#10100E', // Font Share BG
    card: '#252520', // Slightly lighter dark
    text: '#FFFEE3', // Font Share Text/Logo/Button
    subText: '#A8A89D', // Dimmer text
    border: '#3F3F36', // Dark contrast border
    notification: '#EC4899', // Pink
    success: '#10B981', // Emerald
    warning: '#FBBF24', // Amber
    error: '#EF4444', // Red
    highlight: '#3B82F6', // Blue
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    fontSizes: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
      xxxl: 30,
    },
    fontFamilies: {
      regular: 'Satoshi-Regular',
      medium: 'Satoshi-Medium',
      bold: 'Satoshi-Bold',
      light: 'Satoshi-Light',
      black: 'Satoshi-Black',
      italic: 'Satoshi-Italic',
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
    lineHeights: {
      xs: 18, // Approx 1.5 * 12
      s: 21,  // Approx 1.5 * 14
      m: 24,  // Approx 1.5 * 16
      l: 27,  // Approx 1.5 * 18
      xl: 30, // Approx 1.5 * 20
      xxl: 36,// Approx 1.5 * 24
      xxxl: 45// Approx 1.5 * 30
    }
  },
  roundness: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    circle: 9999,
  },
};

// Light theme
export const lightTheme = {
  dark: false,
  colors: {
    primary: '#10100E', // Inverted: Font Share BG
    secondary: '#8B5CF6', // Purple
    accent: '#10B981', // Emerald
    background: '#FFFEE3', // Inverted: Font Share Text/Logo/Button
    card: '#F5F5F0', // Off-white
    text: '#10100E', // Inverted: Font Share BG
    subText: '#52524A', // Darker subtext
    border: '#DCDCCA', // Light contrast border
    notification: '#EC4899', // Pink
    success: '#10B981', // Emerald
    warning: '#FBBF24', // Amber
    error: '#EF4444', // Red
    highlight: '#3B82F6', // Blue
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    fontSizes: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
      xxxl: 30,
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
    lineHeights: {
      xs: 18,
      s: 21,
      m: 24,
      l: 27,
      xl: 30,
      xxl: 36,
      xxxl: 45
    }
  },
  roundness: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    circle: 9999,
  },
};