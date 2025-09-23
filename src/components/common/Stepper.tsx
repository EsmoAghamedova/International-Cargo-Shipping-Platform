interface StepperProps {
  steps: string[];
  currentStep: number; // 0-based index
  onStepChange?: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        return (
          <div
            key={i}
            className={`flex-1 flex items-center ${
              isCompleted ? 'cursor-pointer' : 'cursor-default'
            }`}
            onClick={() => {
              if (isCompleted) onStepChange?.(i); // 👈 მხოლოდ დასრულებულზე იმუშავებს
            }}
          >
            {/* Circle */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition
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

            {/* Label */}
            <span
              className={`ml-2 text-sm ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : isCompleted
                  ? 'text-green-600'
                  : 'text-slate-400'
              }`}
            >
              {step}
            </span>

            {/* Divider */}
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-slate-300 mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}
