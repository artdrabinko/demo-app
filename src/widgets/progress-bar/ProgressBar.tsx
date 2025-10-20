import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { cn } from '../../shared/lib/cn';

interface ProgressBarProps {
  currentStep: number;
  steps: string[];
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  steps, 
  className 
}) => {
  const { t } = useTranslation();

  return (
    <div 
      className={cn("mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg", className)}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label={`Step ${currentStep + 1} of ${steps.length}`}
    >
      <div className="mb-6">
        <p className="text-sm font-semibold text-center text-blue-900">
          {t('progress.step', { current: currentStep + 1, total: steps.length })}
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all shadow-md",
                    isCompleted && "bg-gradient-to-br from-green-500 to-emerald-500 text-white scale-95",
                    isCurrent && "bg-gradient-to-br from-blue-600 to-indigo-600 text-white ring-4 ring-blue-300 scale-110 shadow-lg",
                    !isCompleted && !isCurrent && "bg-white border-2 border-gray-300 text-gray-400"
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span className="text-lg">{index + 1}</span>
                  )}
                </div>
                <p
                  className={cn(
                    "mt-2 text-xs sm:text-sm text-center max-w-[100px]",
                    (isCompleted || isCurrent) ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  {t(`form.steps.${label}`)}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 flex items-center" style={{ maxWidth: '80px' }}>
                  <div
                    className={cn(
                      "h-1 w-full rounded-full transition-all duration-500",
                      index < currentStep ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gray-300"
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};