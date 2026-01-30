import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

interface ChipProps {
    label: string;
    selected?: boolean;
    onPress?: () => void;
}

const COLORS = {
    primary: '#500000',
    primaryLight: '#FFE5E5',
};

export function Chip({ label, selected = false, onPress }: ChipProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                selected ? styles.selected : styles.unselected,
                pressed && styles.pressed,
            ]}
        >
            <Text style={[styles.text, selected ? styles.textSelected : styles.textUnselected]}>
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 28, // h-7
        borderRadius: 999, // rounded-full
        paddingHorizontal: 12, // px-3
        justifyContent: 'center',
        marginBottom: 4, // Add a little margin for wrapping
        marginRight: 4,
    },
    pressed: {
        opacity: 0.8,
    },
    selected: {
        backgroundColor: COLORS.primary,
    },
    unselected: {
        backgroundColor: COLORS.primaryLight,
    },
    text: {
        fontSize: 12, // caption
        fontWeight: '500',
    },
    textSelected: {
        color: '#FFFFFF',
    },
    textUnselected: {
        color: COLORS.primary,
    },
});
