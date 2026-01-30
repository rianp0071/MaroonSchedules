import { useNavigate } from 'react-router';
import { GraduationCap } from 'lucide-react';
import { Button } from './Button';

export function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen max-w-[390px] mx-auto bg-[var(--color-background)] px-4">
      {/* Top Section */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-18 h-18 rounded-3xl bg-[var(--color-primary)] flex items-center justify-center mb-8">
          <GraduationCap size={48} className="text-white" strokeWidth={2} />
        </div>

        <h1 className="text-center mb-4">Build Your Aggie Schedule</h1>

        <p className="text-center text-[var(--color-text-secondary)] max-w-[280px]">
          Plan your classes, avoid conflicts, and get to graduation. Gig 'em!
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="pb-8 space-y-4">
        <Button 
          variant="primary" 
          className="w-full"
          onClick={() => navigate('/dashboard')}
        >
          Get Started
        </Button>
        
        <button 
          className="w-full text-center text-[var(--color-text-secondary)] py-3"
          onClick={() => navigate('/dashboard')}
        >
          I already have an account
        </button>
      </div>
    </div>
  );
}