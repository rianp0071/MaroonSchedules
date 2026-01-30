import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { X } from 'lucide-react-native';
import { Card } from './Card';
import { useCourseStore } from '../store/courseStore';

const COLORS = {
    background: '#F5F5F7',
    primary: '#500000',
    textSecondary: '#666',
    textPrimary: '#000',
    border: '#E0E0E0',
    danger: '#DC2626', // Standard red
};

export function Saved() {
    const navigation = useNavigation<any>();
    const { savedCourses, unsaveCourse, addCourse, courses } = useCourseStore();

    const handleAddToSchedule = (course: any) => {
        const isAlreadyAdded = courses.some((c) => c.id === course.id);
        if (!isAlreadyAdded) {
            addCourse(course);
        }
        navigation.navigate('Builder'); // Assuming Builder is a tab or screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Courses</Text>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {savedCourses.length > 0 ? (
                    savedCourses.map((course) => {
                        const isAdded = courses.some((c) => c.id === course.id);

                        return (
                            <Card key={course.id} style={styles.card}>
                                <View style={styles.cardContent}>
                                    <View
                                        style={[styles.colorStrip, { backgroundColor: course.color || '#E0E0E0' }]}
                                    />

                                    <Pressable
                                        style={styles.cardInfo}
                                        onPress={() => navigation.navigate('CourseDetail', { id: course.id })}
                                    >
                                        <View style={styles.courseHeader}>
                                            <Text style={styles.courseCode}>{course.code}</Text>
                                            <Text style={styles.bullet}>•</Text>
                                            <Text style={styles.credits}>{course.credits} credits</Text>
                                        </View>
                                        <Text style={styles.courseName}>{course.name}</Text>
                                        <Text style={styles.timeInfo}>
                                            {course.days.join('')} {course.time}
                                        </Text>
                                    </Pressable>

                                    <View style={styles.actions}>
                                        <Pressable
                                            onPress={() => handleAddToSchedule(course)}
                                            disabled={isAdded}
                                            style={({ pressed }) => [
                                                styles.addButton,
                                                isAdded ? styles.addedButton : styles.activeAddButton,
                                                pressed && !isAdded && styles.pressed,
                                            ]}
                                        >
                                            <Text style={[styles.addButtonText, isAdded && styles.addedButtonText]}>
                                                {isAdded ? 'Added' : 'Add'}
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            onPress={() => unsaveCourse(course.id)}
                                            style={({ pressed }) => [
                                                styles.removeButton,
                                                pressed && styles.pressed,
                                            ]}
                                        >
                                            <X size={16} color={COLORS.danger} />
                                        </Pressable>
                                    </View>
                                </View>
                            </Card>
                        );
                    })
                ) : (
                    <Card>
                        <Text style={styles.emptyText}>
                            No saved courses yet. Save courses from the Search page to view them here.
                        </Text>
                    </Card>
                )}
                <View style={{ height: 80 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 16,
        paddingTop: 60,
    },
    title: {
        fontSize: 24, // h2
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#000',
    },
    scrollContent: {
        paddingBottom: 20,
        gap: 12,
    },
    card: {
        padding: 0, // Reset default padding to handle custom layout
        overflow: 'hidden',
    },
    cardContent: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    colorStrip: {
        width: 6,
        height: 64, // approximate height
        borderRadius: 3,
    },
    cardInfo: {
        flex: 1,
    },
    courseHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    courseCode: {
        fontWeight: '600',
        fontSize: 16,
        color: COLORS.textPrimary,
    },
    bullet: {
        color: COLORS.textSecondary,
    },
    credits: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    courseName: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    timeInfo: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    actions: {
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        minWidth: 60,
        alignItems: 'center',
    },
    activeAddButton: {
        backgroundColor: COLORS.primary,
    },
    addedButton: {
        backgroundColor: COLORS.border,
    },
    addButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
    },
    addedButtonText: {
        color: COLORS.textSecondary,
    },
    removeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(220, 38, 38, 0.1)', // Danger with opacity
        alignItems: 'center',
        justifyContent: 'center',
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.95 }],
    },
    emptyText: {
        textAlign: 'center',
        color: COLORS.textSecondary,
        padding: 16,
    },
});
