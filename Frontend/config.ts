import { Platform } from 'react-native';

/**
 * Centralized API configuration
 * Uses environment variable EXPO_PUBLIC_API_URL for the backend URL
 * Falls back to localhost if not set
 */
export const API_URL = Platform.select({
    android: process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8000', // Android emulator localhost
    ios: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000',
    default: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000',
});

export const config = {
    apiUrl: API_URL,
};
