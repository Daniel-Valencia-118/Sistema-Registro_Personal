import React, { useState } from 'react';
import Button from '../Forms/Button';

export default function Wizard({ stepTitles = [], children, initialStep = 0, onComplete, isSubmitting = false }) {
    const [currentStep, setCurrentStep] = useState(initialStep);

    const nextStep = () => {
        if (currentStep < stepTitles.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };
    
    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <div className="wizard">
            <div className="mb-6">
                <div className="flex justify-between items-center gap-2">
                    {stepTitles.map((title, index) => {
                        const isCompleted = index < currentStep;
                        const isCurrent = index === currentStep;

                        return (
                            <div key={title || index} className="flex-1 text-center">
                                <div
                                    className={`h-2 rounded-full transition-colors duration-200 ${
                                        isCompleted || isCurrent ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                />
                                <span
                                    className={`text-xs mt-1 block font-medium ${
                                        isCurrent ? 'text-blue-600' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                                    }`}
                                >
                                    {title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="step-content my-4">
                {typeof children === 'function' ? children(currentStep) : children}
            </div>

            {/* Navegación */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={prevStep}
                    disabled={currentStep === 0 || isSubmitting}
                >
                    Anterior
                </Button>

                {currentStep === stepTitles.length - 1 ? (
                    <Button
                        type="button"
                        variant="primary"
                        onClick={onComplete}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Guardando...' : 'Finalizar'}
                    </Button>
                ) : (
                    <Button
                        type="button"
                        variant="primary"
                        onClick={nextStep}
                        disabled={isSubmitting}
                    >
                        Siguiente
                    </Button>
                )}
            </div>
        </div>
    );
}