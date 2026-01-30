import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search as SearchIcon, SlidersHorizontal, Plus, Star } from 'lucide-react';
import { Chip } from './Chip';
import { Card } from './Card';
import { useCourseStore } from '../store/courseStore';

const availableCourses = [
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
    description: 'Database design, SQL, and database management systems.',
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
    description: 'Study of programming language concepts and paradigms.',
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
    description: 'Professional and technical writing for engineers.',
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
    description: '3D graphics, rendering algorithms, and OpenGL programming.',
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
    description: 'Team-based software development project.',
  },
];

const filters = ['Core', 'Elective', 'Online', 'Morning', 'Afternoon'];

export function Search() {
  const navigate = useNavigate();
  const { addCourse, courses } = useCourseStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch =
      searchQuery === '' ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.professor.toLowerCase().includes(searchQuery.toLowerCase());

    const isAlreadyAdded = courses.some((c) => c.id === course.id);

    return matchesSearch && !isAlreadyAdded;
  });

  const handleAddCourse = (course: typeof availableCourses[0]) => {
    addCourse(course as any);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 pt-4">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <SearchIcon
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
          />
          <input
            type="text"
            placeholder="Search by course or professor"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(79,70,229,0.08)]"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {filters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            selected={selectedFilters.includes(filter)}
            onClick={() => toggleFilter(filter)}
          />
        ))}
      </div>

      {/* Search Results */}
      <div className="space-y-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="cursor-pointer">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1" onClick={() => navigate(`/course/${course.id}`)}>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{course.code}</p>
                  <span className="text-[var(--color-text-secondary)]">•</span>
                  <span className="caption text-[var(--color-text-secondary)]">
                    {course.credits} credits
                  </span>
                </div>

                <h3 className="mb-2">{course.name}</h3>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-[var(--color-warning)] fill-[var(--color-warning)]" />
                    <span className="caption text-[var(--color-text-secondary)]">
                      {course.rating}
                    </span>
                  </div>
                  <span className="text-[var(--color-text-secondary)]">•</span>
                  <span className="caption text-[var(--color-text-secondary)]">
                    {course.professor}
                  </span>
                </div>

                <p className="caption text-[var(--color-text-secondary)]">
                  {course.days.join('')} {course.time}
                </p>
              </div>

              <button
                onClick={() => handleAddCourse(course)}
                className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
              >
                <Plus size={20} strokeWidth={2.5} />
              </button>
            </div>
          </Card>
        ))}

        {filteredCourses.length === 0 && (
          <Card>
            <p className="text-center text-[var(--color-text-secondary)]">
              {searchQuery ? 'No courses found' : 'All available courses have been added'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
