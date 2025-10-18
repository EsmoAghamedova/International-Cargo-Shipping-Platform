interface StepperProps {
  steps: string[];
  currentStep: number; // 0-based index
  onStepChange?: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full mb-8">
      {/* Stepper circles */}
      <div className="flex items-center justify-between relative">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;

          return (
            <div
              key={i}
              className={`flex items-center ${
                isCompleted ? 'cursor-pointer' : 'cursor-default'
              } sm:flex-1`}
              onClick={() => {
                if (isCompleted) onStepChange?.(i);
              }}
            >
              {/* Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition shrink-0
                  ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : isCompleted
                        ? 'bg-green-600 border-green-600 text-white hover:opacity-80'
                        : 'border-slate-400 text-slate-400'
                  }`}
              >
                {i + 1}
              </div>

              {/* Label (only desktop+) */}
              <span
                className={`ml-2 text-sm hidden sm:inline ${
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : isCompleted
                      ? 'text-green-600'
                      : 'text-slate-400'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="relative mt-4 h-2 bg-slate-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
