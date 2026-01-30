import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ArrowLeft, MapPin, User, Clock, BookOpen } from 'lucide-react-native';
import { Button } from './Button';
import { useCourseStore } from '../store/courseStore';

// Define Param List for Type Safety (Optional but good)
type RootStackParamList = {
    CourseDetail: { id: string };
    Builder: undefined;
};

type CourseDetailRouteProp = RouteProp<RootStackParamList, 'CourseDetail'>;

// Duplicating for simplicity or import if shared properly
const allCourses = [
    {
        id: '1',
        code: 'CSCE 221',
        name: 'Data Structures & Algorithms',
        credits: 3,
        professor: 'Dr. Smith',
        rating: 4.6,
        time: '10:30-11:45',
        days: ['M', 'W', 'F'],
        location: 'HRBB 124',
        startTime: 630,
        endTime: 705,
        prerequisites: 'CSCE 121',
        description: 'Study of the concepts, implementation, and application of data structures and algorithms. Topics include lists, stacks, queues, trees, graphs, sorting, and searching algorithms.',
    },
    {
        id: '2',
        code: 'MATH 304',
        name: 'Linear Algebra',
        credits: 3,
        professor: 'Dr. Johnson',
        rating: 4.2,
        time: '13:00-14:15',
        days: ['T', 'Th'],
        location: 'BLOC 161',
        startTime: 780,
        endTime: 855,
        prerequisites: 'MATH 152',
        description: 'Vector spaces, linear transformations, matrices, determinants, eigenvalues and eigenvectors, and applications.',
    },
    {
        id: '3',
        code: 'CSCE 310',
        name: 'Database Systems',
        credits: 3,
        professor: 'Dr. Williams',
        rating: 4.8,
        time: '09:00-10:15',
        days: ['T', 'Th'],
        location: 'HRBB 113',
        startTime: 540,
        endTime: 615,
        prerequisites: 'CSCE 221',
        description: 'Database design, SQL, relational database management systems, normalization, and transaction processing.',
    },
    {
        id: '4',
        code: 'CSCE 314',
        name: 'Programming Languages',
        credits: 3,
        professor: 'Dr. Anderson',
        rating: 4.5,
        time: '14:30-15:45',
        days: ['M', 'W', 'F'],
        location: 'ZACH 350',
        startTime: 870,
        endTime: 945,
        prerequisites: 'CSCE 221',
        description: 'Study of programming language concepts including functional, object-oriented, and logic programming paradigms.',
    },
    {
        id: '5',
        code: 'ENGL 210',
        name: 'Technical Writing',
        credits: 3,
        professor: 'Dr. Martinez',
        rating: 4.3,
        time: '11:00-12:15',
        days: ['T', 'Th'],
        location: 'BLOCKER 166',
        startTime: 660,
        endTime: 735,
        description: 'Professional and technical writing for engineers. Focus on clarity, organization, and effective communication.',
    },
    {
        id: '6',
        code: 'CSCE 441',
        name: 'Computer Graphics',
        credits: 3,
        professor: 'Dr. Chen',
        rating: 4.7,
        time: '15:00-16:15',
        days: ['M', 'W'],
        location: 'HRBB 124',
        startTime: 900,
        endTime: 975,
        prerequisites: 'CSCE 221, MATH 304',
        description: '3D graphics, rendering algorithms, transformations, lighting models, and OpenGL programming.',
    },
    {
        id: '7',
        code: 'CSCE 482',
        name: 'Senior Capstone Design',
        credits: 3,
        professor: 'Dr. Thompson',
        rating: 4.4,
        time: '16:30-18:00',
        days: ['M', 'W'],
        location: 'ZACH 590',
        startTime: 990,
        endTime: 1080,
        prerequisites: 'Senior standing',
        description: 'Team-based software development project with industry sponsors. Complete design and implementation of a software system.',
    },
];

const COLORS = {
    background: '#F5F5F7',
    surface: '#FFFFFF',
    primary: '#500000',
    textSecondary: '#666',
    textPrimary: '#000',
    border: '#E0E0E0',
};

export function CourseDetail() {
    const route = useRoute<CourseDetailRouteProp>();
    const navigation = useNavigation<any>();
    const { courses, addCourse, saveCourse, savedCourses } = useCourseStore();

    const { id } = route.params || {};

    const course = allCourses.find((c) => c.id === id);
    const isAdded = courses.some((c) => c.id === id);
    const isSaved = savedCourses.some((c) => c.id === id);

    if (!course) {
        return (
            <View style={styles.container}>
                <Text>Course not found</Text>
            </View>
        );
    }

    const handleAddToSchedule = () => {
        if (!isAdded) {
            addCourse(course as any);
        }
        navigation.navigate('Main', { screen: 'Builder' });
    };

    const handleSaveForLater = () => {
        if (!isSaved) {
            saveCourse(course as any);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color={COLORS.textPrimary} />
                </Pressable>

                <Text style={styles.title}>{course.name}</Text>
                <Text style={styles.subtitle}>{course.code}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Info Card */}
                <View style={styles.card}>
                    <InfoRow icon={BookOpen} label="Credits" value={`${course.credits} credits`} />
                    <InfoRow icon={User} label="Professor" value={course.professor} />
                    <InfoRow icon={MapPin} label="Location" value={course.location} />
                    <InfoRow
                        icon={Clock}
                        label="Meeting Times"
                        value={`${course.days.join('')} ${course.time}`}
                    />
                    {course.prerequisites && (
                        <InfoRow icon={BookOpen} label="Prerequisites" value={course.prerequisites} />
                    )}
                </View>

                {/* Description */}
                {course.description && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Description</Text>
                        <Text style={styles.description}>
                            {course.description}
                        </Text>
                    </View>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.footer}>
                <Button
                    variant="primary"
                    style={styles.button}
                    onPress={handleAddToSchedule}
                // disabled={isAdded} // Button handles opacity? or need customization
                >
                    {isAdded ? 'Added to Schedule' : 'Add to Schedule'}
                </Button>
                <Button
                    variant="secondary"
                    style={styles.button}
                    onPress={handleSaveForLater}
                >
                    {isSaved ? 'Saved' : 'Save for Later'}
                </Button>
            </View>
        </View>
    );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <View style={styles.infoRow}>
            <Icon size={20} color={COLORS.textSecondary} style={styles.icon} />
            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: 16,
        paddingTop: 60, // Safe area
        backgroundColor: COLORS.surface,
        paddingBottom: 24,
        marginBottom: 16,
    },
    backButton: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    scrollContent: {
        padding: 16,
        paddingTop: 0,
        gap: 16,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        gap: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: COLORS.textSecondary,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    icon: {
        marginTop: 2,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textPrimary,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        padding: 16,
        paddingBottom: 32,
        gap: 12,
    },
    button: {
        width: '100%',
    },
});
