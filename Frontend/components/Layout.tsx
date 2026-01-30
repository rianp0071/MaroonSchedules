import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
});
