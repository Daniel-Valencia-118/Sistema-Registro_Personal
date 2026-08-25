import React, { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    name,
    id,
    type = 'text',
    value,
    onChange,
    error,
    placeholder = '',
    required = false,
    className = '',
    ...props
}, ref) => {
    const inputId = id || name;
    
    // Los inputs tipo 'file' no permiten controlar la prop 'value' con strings o null
    const inputValue = type === 'file' ? undefined : (value ?? '');

    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                ref={ref}
                id={inputId}
                name={name}
                type={type}
                value={inputValue}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full px-4 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                } ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;