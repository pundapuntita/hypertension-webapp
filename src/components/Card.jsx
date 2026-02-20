import React from 'react';

export function Card({ children, className = '', title, subtitle }) {
    return (
        <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-soft border border-gray-50 ${className}`}>
            {(title || subtitle) && (
                <div className="mb-6">
                    {title && <h3 className="text-xl font-bold text-gray-800">{title}</h3>}
                    {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
                </div>
            )}
            {children}
        </div>
    );
}
