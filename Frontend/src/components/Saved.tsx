import { useNavigate } from 'react-router';
import { X } from 'lucide-react';
import { Card } from './Card';
import { useCourseStore } from '../store/courseStore';

export function Saved() {
  const navigate = useNavigate();
  const { savedCourses, unsaveCourse, addCourse, courses } = useCourseStore();

  const handleAddToSchedule = (course: any) => {
    const isAlreadyAdded = courses.some((c) => c.id === course.id);
    if (!isAlreadyAdded) {
      addCourse(course);
    }
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 pt-4">
      <h2 className="mb-4">Saved Courses</h2>

      <div className="space-y-3">
        {savedCourses.length > 0 ? (
          savedCourses.map((course) => {
            const isAdded = courses.some((c) => c.id === course.id);

            return (
              <Card key={course.id}>
                <div className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-16 rounded-full flex-shrink-0"
                    style={{ backgroundColor: course.color }}
                  />
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{course.code}</p>
                      <span className="text-[var(--color-text-secondary)]">•</span>
                      <span className="caption text-[var(--color-text-secondary)]">
                        {course.credits} credits
                      </span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-2">{course.name}</p>
                    <p className="caption text-[var(--color-text-secondary)]">
                      {course.days.join('')} {course.time}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToSchedule(course)}
                      disabled={isAdded}
                      className={`px-3 py-1.5 rounded-lg caption font-semibold transition-all ${
                        isAdded
                          ? 'bg-[var(--color-border)] text-[var(--color-text-secondary)] cursor-not-allowed'
                          : 'bg-[var(--color-primary)] text-white active:scale-95'
                      }`}
                    >
                      {isAdded ? 'Added' : 'Add'}
                    </button>
                    <button
                      onClick={() => unsaveCourse(course.id)}
                      className="w-8 h-8 rounded-full bg-[var(--color-danger)] bg-opacity-10 text-[var(--color-danger)] flex items-center justify-center mx-auto"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Card>
            <p className="text-center text-[var(--color-text-secondary)]">
              No saved courses yet. Save courses from the Search page to view them here.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
