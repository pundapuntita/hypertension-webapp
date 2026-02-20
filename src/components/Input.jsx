import React from 'react';
import { Info } from 'lucide-react';

export function Input({ label, type = 'text', value, onChange, placeholder, name, min, max, icon, tooltipInfo }) {
    return (
        <div className="mb-5 group/input">
            <div className="flex items-center gap-1.5 mb-2 ml-1">
                <label className="block text-sm font-semibold text-gray-600 group-focus-within/input:text-primary transition-colors whitespace-nowrap">
                    {label}
                </label>
                {tooltipInfo && (
                    <div className="relative group/tooltip flex items-center">
                        <div className="cursor-help">
                            <Info className="w-4 h-4 text-gray-400 group-hover/tooltip:text-primary transition-colors" />
                        </div>
                        <div className="absolute bottom-full mb-2 -left-16 sm:left-1/2 sm:-translate-x-1/2 w-max max-w-[200px] p-2.5 bg-gray-900/95 backdrop-blur-md text-white text-xs rounded-xl shadow-xl z-50 font-normal border border-white/10 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 translate-y-1 group-hover/tooltip:translate-y-0 pointer-events-none text-center">
                            <div className="absolute -bottom-1.5 left-20 sm:left-1/2 sm:-translate-x-1/2 w-3 h-3 bg-gray-900/95 rotate-45 border-r border-b border-white/10"></div>
                            <span className="relative z-10 block whitespace-pre-wrap">{tooltipInfo}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    className="w-full pl-4 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-800 
                     focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white 
                     transition-all outline-none placeholder:text-gray-300"
                />
                {icon && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}

export function Select({ label, value, onChange, options, name }) {
    return (
        <div className="mb-5 group">
            <label className="block text-sm font-semibold text-gray-600 mb-2 ml-1 group-focus-within:text-primary transition-colors whitespace-nowrap">
                {label}
            </label>
            <div className="relative">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full pl-4 pr-10 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-800 
                     focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white 
                     transition-all outline-none appearance-none cursor-pointer"
                >
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
