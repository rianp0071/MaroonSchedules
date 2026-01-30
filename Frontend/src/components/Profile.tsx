import { useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Profile() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    major: 'Computer Science',
    graduationYear: '2026',
    preferredTime: 'Morning',
    maxCredits: '15',
    avoidFriday: false,
    showOnlineFirst: true,
  });

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 pt-4">
      <h2 className="mb-6">Profile & Preferences</h2>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-3xl font-semibold mb-3">
          R
        </div>
        <h3>Ritej</h3>
        <p className="text-[var(--color-text-secondary)]">ritej@tamu.edu</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-[var(--color-surface)] rounded-2xl p-4 mb-4 space-y-4">
        <h3 className="mb-4">Account Information</h3>

        <InputField
          label="Major"
          value={preferences.major}
          onChange={(value) => setPreferences({ ...preferences, major: value })}
        />

        <InputField
          label="Graduation Year"
          value={preferences.graduationYear}
          onChange={(value) => setPreferences({ ...preferences, graduationYear: value })}
        />

        <SelectField
          label="Preferred Time of Day"
          value={preferences.preferredTime}
          options={['Morning', 'Afternoon', 'Evening', 'No Preference']}
          onChange={(value) => setPreferences({ ...preferences, preferredTime: value })}
        />

        <InputField
          label="Max Credits Per Term"
          value={preferences.maxCredits}
          onChange={(value) => setPreferences({ ...preferences, maxCredits: value })}
          type="number"
        />
      </div>

      {/* Preferences */}
      <div className="bg-[var(--color-surface)] rounded-2xl p-4 mb-4 space-y-4">
        <h3 className="mb-4">Preferences</h3>

        <ToggleField
          label="Avoid Friday Classes"
          description="Prioritize schedules without Friday classes"
          checked={preferences.avoidFriday}
          onChange={(checked) => setPreferences({ ...preferences, avoidFriday: checked })}
        />

        <ToggleField
          label="Show Online Courses First"
          description="Display online courses at the top of search results"
          checked={preferences.showOnlineFirst}
          onChange={(checked) => setPreferences({ ...preferences, showOnlineFirst: checked })}
        />
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-[var(--color-surface)] rounded-2xl p-4 flex items-center justify-center gap-2 text-[var(--color-danger)] font-semibold active:scale-[0.98] transition-transform"
      >
        <LogOut size={20} />
        Log Out
      </button>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="caption text-[var(--color-text-secondary)] mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 px-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(80,0,0,0.08)]"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="caption text-[var(--color-text-secondary)] mb-2 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 px-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(80,0,0,0.08)]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">
        <p className="font-medium mb-1">{label}</p>
        <p className="caption text-[var(--color-text-secondary)]">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
          checked ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'
        }`}
      >
        <div
          className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
