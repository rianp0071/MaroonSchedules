import { useNavigate } from 'react-router';
import { Plus } from 'lucide-react';
import { Card } from './Card';
import { useCourseStore } from '../store/courseStore';

export function Dashboard() {
  const navigate = useNavigate();
  const { courses } = useCourseStore();

  const currentTerm = 'Spring 2026';
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const maxCredits = 15;

  // Get today's courses (mock data showing all for demo)
  const todaysCourses = courses.filter(course => course.days.includes('M'));

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 pt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[var(--color-text-secondary)]">Howdy</p>
          <h2>Ritej</h2>
        </div>
        <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-semibold">
          R
        </div>
      </div>

      {/* Current Term Card */}
      <Card className="mb-6">
        <h3 className="mb-3">{currentTerm}</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="caption text-[var(--color-text-secondary)]">
              {totalCredits} / {maxCredits} credits
            </span>
            <span className="caption text-[var(--color-primary)]">
              {maxCredits - totalCredits} remaining
            </span>
          </div>
          <div className="h-2 rounded-full bg-[var(--color-border)] overflow-hidden">
            <div
              className="h-full bg-[var(--color-primary)] transition-all duration-300"
              style={{ width: `${(totalCredits / maxCredits) * 100}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Today's Classes */}
      <div>
        <h3 className="mb-4">Today</h3>
        <div className="space-y-3">
          {todaysCourses.length > 0 ? (
            todaysCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="flex items-center gap-3 bg-[var(--color-surface)] rounded-xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}
              >
                <div
                  className="w-1.5 h-12 rounded-full"
                  style={{ backgroundColor: course.color }}
                />
                <div className="flex-1">
                  <p className="font-semibold">{course.code}</p>
                  <p className="caption text-[var(--color-text-secondary)]">{course.name}</p>
                </div>
                <div className="bg-[var(--color-primary-light)] px-3 py-1.5 rounded-full">
                  <span className="caption text-[var(--color-primary)]">{course.time}</span>
                </div>
              </div>
            ))
          ) : (
            <Card>
              <p className="text-center text-[var(--color-text-secondary)]">
                No classes scheduled for today
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/search')}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
        style={{ boxShadow: '0 4px 12px rgba(80, 0, 0, 0.4)' }}
      >
        <Plus size={28} strokeWidth={2.5} />
      </button>
    </div>
  );
}