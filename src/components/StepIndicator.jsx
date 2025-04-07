
import React from 'react';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Item' },
    { id: 2, name: 'Delivery' },
    { id: 3, name: 'Confirmation' }
  ];

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.id === currentStep 
                    ? 'bg-agritech-green text-white' 
                    : step.id < currentStep 
                      ? 'bg-agritech-paleGreen border border-agritech-green text-agritech-darkGreen' 
                      : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step.id < currentStep ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${
                step.id === currentStep 
                  ? 'text-agritech-darkGreen' 
                  : 'text-gray-500'
              }`}>
                {step.name}
              </span>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2">
                <div className={`h-1 ${
                  step.id < currentStep ? 'bg-agritech-green' : 'bg-gray-200'
                }`}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
