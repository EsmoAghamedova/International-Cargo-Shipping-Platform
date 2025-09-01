interface StepperProps {
  steps: string[];
  currentStep: number; // 0-based index
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        return (
          <div key={i} className="flex-1 flex items-center">
            {/* Circle */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 
                ${isActive ? 'bg-blue-600 border-blue-600 text-white' : isCompleted ? 'bg-green-600 border-green-600 text-white' : 'border-slate-400 text-slate-400'}`}
            >
              {i + 1}
            </div>

            {/* Label */}
            <span
              className={`ml-2 text-sm ${
                isActive ? 'text-blue-400 font-medium' : 'text-slate-400'
              }`}
            >
              {step}
            </span>

            {/* Divider */}
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-slate-600 mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}
