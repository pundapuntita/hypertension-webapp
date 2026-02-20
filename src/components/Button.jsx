import React from 'react';

export function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
    const baseStyles = "w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-primary text-white shadow-soft hover:bg-primary-hover hover:shadow-lg",
        secondary: "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100 shadow-sm",
        outline: "border-2 border-primary text-primary hover:bg-primary/5",
        ghost: "text-gray-500 hover:bg-gray-100/50"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
