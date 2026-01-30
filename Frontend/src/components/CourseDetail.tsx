import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, MapPin, User, Clock, BookOpen } from 'lucide-react';
import { Button } from './Button';
import { useCourseStore } from '../store/courseStore';

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

export function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, addCourse, saveCourse, savedCourses } = useCourseStore();

  const course = allCourses.find((c) => c.id === id);
  const isAdded = courses.some((c) => c.id === id);
  const isSaved = savedCourses.some((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] px-4 pt-4">
        <p>Course not found</p>
      </div>
    );
  }

  const handleAddToSchedule = () => {
    if (!isAdded) {
      addCourse(course as any);
    }
    navigate('/builder');
  };

  const handleSaveForLater = () => {
    if (!isSaved) {
      saveCourse(course as any);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="bg-[var(--color-surface)] px-4 pt-4 pb-6 mb-4">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-[var(--color-text-primary)]" />
        </button>

        <h1 className="mb-2">{course.name}</h1>
        <p className="text-[var(--color-text-secondary)]">{course.code}</p>
      </div>

      <div className="px-4 space-y-4">
        {/* Info Card */}
        <div className="bg-[var(--color-surface)] rounded-2xl p-4 space-y-4">
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
        </div>

        {/* Description */}
        {course.description && (
          <div className="bg-[var(--color-surface)] rounded-2xl p-4">
            <h3 className="mb-2">Description</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {course.description}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-[var(--color-surface)] border-t border-[var(--color-border)] p-4 space-y-3">
        <Button
          variant="primary"
          className="w-full"
          onClick={handleAddToSchedule}
          disabled={isAdded}
        >
          {isAdded ? 'Added to Schedule' : 'Add to Schedule'}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleSaveForLater}
          disabled={isSaved}
        >
          {isSaved ? 'Saved' : 'Save for Later'}
        </Button>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={20} className="text-[var(--color-text-secondary)] mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="caption text-[var(--color-text-secondary)] mb-1">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
