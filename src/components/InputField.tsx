import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  placeholder: string;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  unit, 
  placeholder 
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative rounded-md shadow-sm">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 border"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <span className="text-gray-500 sm:text-sm">{unit}</span>
      </div>
    </div>
  </div>
);