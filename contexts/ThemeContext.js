import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../constants/themes';

// Create the theme context
export const ThemeContext = createContext({
  theme: darkTheme,
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Get device color scheme preference
  const colorScheme = useColorScheme();
  
  // Set initial theme based on device preference
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  
  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  // Set theme function
  const setTheme = (dark) => {
    setIsDark(dark);
  };
  
  // Get the current theme object
  const theme = isDark ? darkTheme : lightTheme;
  
  // Context value
  const value = {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
  
  // Render the provider
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};