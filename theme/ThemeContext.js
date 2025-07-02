import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './index';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const colorScheme = Appearance.getColorScheme();
    const [isDark, setIsDark] = useState(colorScheme === 'dark');
    const [theme, setTheme] = useState(isDark ? darkTheme : lightTheme);

    // Carrega preferencia salva
    useEffect(() => {
        (async () => {
            const savedTheme = await AsyncStorage.getItem('@user_theme_preference');
            if (savedTheme) {
                const dark = savedTheme === 'dark';
                setIsDark(dark);
                setTheme(dark ? darkTheme : lightTheme);
            }
        })();
    }, []);

    // Alterna tema e salva
    const toggleTheme = async () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        setTheme(newIsDark ? darkTheme : lightTheme);
        await AsyncStorage.setItem('@user_theme_preference', newIsDark ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
