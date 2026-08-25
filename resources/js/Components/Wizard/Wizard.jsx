import React, { useState } from 'react';
import Button from '../Forms/Button';

export default function Wizard({ steps, initialStep = 0, onComplete, isSubmitting = false }) {
    const [currentStep, setCurrentStep] = useState(initialStep);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleComplete = () => {
        if (onComplete && typeof onComplete === 'function') {
            onComplete();
        }
    };

    const currentStepData = steps[currentStep];

    const renderStepContent = () => {
        if (!currentStepData) return null;
        
        const Content = currentStepData.component || currentStepData.content;
        if (typeof Content === 'function') {
            return Content();
        }
        return Content;
    };

    return (
        <div className="wizard">
            {/* Barra de progreso */}
            <div className="mb-6">
                <div className="flex justify-between items-center gap-2">
                    {steps.map((step, index) => {
                        const isCompleted = index < currentStep;
                        const isCurrent = index === currentStep;

                        return (
                            <div key={step.title || index} className="flex-1 text-center">
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
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Contenido del paso actual */}
            <div className="step-content my-4">
                {renderStepContent()}
            </div>

            {/* Botones de navegación */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={prevStep}
                    disabled={currentStep === 0 || isSubmitting}
                >
                    Anterior
                </Button>

                {currentStep === steps.length - 1 ? (
                    <Button
                        type="button"
                        variant="primary"
                        onClick={handleComplete}
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