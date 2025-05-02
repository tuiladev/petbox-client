import React from 'react';

const FloatingInput = ({ 
    label, 
    value, 
    onChange, 
    onKeyDown,
    name, 
    type = 'text', 
    error = false 
}) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`
                    w-full px-3 py-3 border rounded-md outline-none transition-all
                    ${(!value && error) ? 'border-red-500' : 'border-gray-300'}
                    focus:border-primary
                `}
                placeholder=" "
            />
            <label
                className={`
                    absolute left-3 transition-all duration-200 pointer-events-none
                    ${(isFocused || value) 
                        ? 'text-xs -top-2 bg-white px-1' 
                        : 'text-base top-1/2 -translate-y-1/2'
                    }
                    ${(!value && error) ? 'text-red-500' : 'text-gray-500'}
                `}
            >
                {label}
            </label>
        </div>
    );
};

export default FloatingInput; 