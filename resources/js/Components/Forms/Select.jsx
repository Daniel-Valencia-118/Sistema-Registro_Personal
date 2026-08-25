import React, { forwardRef } from 'react';

const Select = forwardRef(({
    label,
    name,
    id,
    value,
    onChange,
    options = [],
    error,
    required = false,
    placeholder = 'Seleccione...',
    className = '',
    ...props
}, ref) => {
    const selectId = id || name;

    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <select
                ref={ref}
                id={selectId}
                name={name}
                value={value ?? ''}
                onChange={onChange}
                required={required}
                className={`w-full px-4 py-2 border rounded-md bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                } ${className}`}
                {...props}
            >
                <option value="" disabled hidden={required}>
                    {placeholder}
                </option>
                {options?.map((option, index) => (
                    <option key={option.value ?? index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});

Select.displayName = 'Select';
export default Select;