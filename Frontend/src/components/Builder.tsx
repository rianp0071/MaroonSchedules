import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Card } from './Card';
import { useCourseStore } from '../store/courseStore';

type ViewMode = 'week' | 'list';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const dayMap: Record<string, string> = {
  M: 'Mon',
  T: 'Tue',
  W: 'Wed',
  Th: 'Thu',
  F: 'Fri',
};

const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8am to 8pm

export function Builder() {
  const { courses, removeCourse } = useCourseStore();
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Detect time conflicts
  const conflicts = detectConflicts(courses);
  const hasConflicts = conflicts.length > 0;

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 pt-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-4">Schedule Builder</h2>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <select className="h-10 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] font-medium">
            <option>Spring 2026</option>
            <option>Fall 2025</option>
          </select>

          <div className="flex bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-1.5 rounded-md caption font-semibold transition-all ${
                viewMode === 'week'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-1.5 rounded-md caption font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Conflict Banner */}
      {hasConflicts && (
        <div className="mb-4 bg-[var(--color-danger)] text-white rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold mb-1">Time Conflict Detected</p>
              <p className="caption opacity-90">{conflicts[0]}</p>
            </div>
          </div>
        </div>
      )}

      {/* View Content */}
      {viewMode === 'week' ? (
        <WeekView
          courses={courses}
          conflicts={conflicts}
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
          onRemoveCourse={removeCourse}
        />
      ) : (
        <ListView courses={courses} onRemoveCourse={removeCourse} />
      )}
    </div>
  );
}

function WeekView({
  courses,
  conflicts,
  selectedCourse,
  onSelectCourse,
  onRemoveCourse,
}: any) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[700px]">
        {/* Day Headers */}
        <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-1 mb-2">
          <div></div>
          {days.map((day) => (
            <div key={day} className="text-center caption font-semibold text-[var(--color-text-secondary)]">
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="relative">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-[60px_repeat(5,1fr)] gap-1 h-16">
              <div className="caption text-[var(--color-text-secondary)] pr-2 text-right">
                {hour > 12 ? hour - 12 : hour}
                {hour >= 12 ? 'pm' : 'am'}
              </div>
              {days.map((day) => (
                <div
                  key={day}
                  className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
                />
              ))}
            </div>
          ))}

          {/* Course Blocks */}
          {courses.map((course: any) =>
            course.days.map((day: string) => {
              const dayIndex = days.indexOf(dayMap[day]);
              if (dayIndex === -1) return null;

              const topOffset = ((course.startTime - 480) / 60) * 64; // 480 = 8am in minutes
              const height = ((course.endTime - course.startTime) / 60) * 64;

              const hasConflict = conflicts.some((c: string) => c.includes(course.code));

              return (
                <div
                  key={`${course.id}-${day}`}
                  onClick={() => onSelectCourse(course.id)}
                  className="absolute rounded-lg p-2 cursor-pointer transition-transform hover:scale-105"
                  style={{
                    left: `calc(60px + ${dayIndex * (100 / 5)}% + 2px)`,
                    top: `${topOffset}px`,
                    width: `calc(${100 / 5}% - 4px)`,
                    height: `${height}px`,
                    backgroundColor: course.color,
                    border: hasConflict ? '2px solid var(--color-danger)' : 'none',
                  }}
                >
                  <p className="caption font-semibold text-white">{course.code}</p>
                  <p className="text-[10px] text-white opacity-90">{course.location}</p>
                  <p className="text-[10px] text-white opacity-90">{course.time}</p>

                  {hasConflict && (
                    <AlertTriangle size={14} className="absolute top-1 right-1 text-white" />
                  )}

                  {selectedCourse === course.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveCourse(course.id);
                        onSelectCourse(null);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-danger)] text-white flex items-center justify-center"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function ListView({ courses, onRemoveCourse }: any) {
  return (
    <div className="space-y-3">
      {courses.length > 0 ? (
        courses.map((course: any) => (
          <Card key={course.id}>
            <div className="flex items-start gap-3">
              <div
                className="w-1.5 h-16 rounded-full flex-shrink-0"
                style={{ backgroundColor: course.color }}
              />
              <div className="flex-1">
                <p className="font-semibold mb-1">{course.code}</p>
                <p className="text-[var(--color-text-secondary)] mb-2">{course.name}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="caption text-[var(--color-text-secondary)]">
                    {course.days.join('')} {course.time}
                  </span>
                  <span className="text-[var(--color-text-secondary)]">•</span>
                  <span className="caption text-[var(--color-text-secondary)]">
                    {course.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onRemoveCourse(course.id)}
                className="w-8 h-8 rounded-full bg-[var(--color-danger)] bg-opacity-10 text-[var(--color-danger)] flex items-center justify-center flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          </Card>
        ))
      ) : (
        <Card>
          <p className="text-center text-[var(--color-text-secondary)]">
            No courses added yet. Go to Search to add courses.
          </p>
        </Card>
      )}
    </div>
  );
}

function detectConflicts(courses: any[]) {
  const conflicts: string[] = [];

  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      const c1 = courses[i];
      const c2 = courses[j];

      // Check if they share any days
      const sharedDays = c1.days.filter((d: string) => c2.days.includes(d));

      if (sharedDays.length > 0) {
        // Check time overlap
        if (
          (c1.startTime < c2.endTime && c1.endTime > c2.startTime) ||
          (c2.startTime < c1.endTime && c2.endTime > c1.startTime)
        ) {
          conflicts.push(`${c1.code} overlaps with ${c2.code}`);
        }
      }
    }
  }

  return conflicts;
}
