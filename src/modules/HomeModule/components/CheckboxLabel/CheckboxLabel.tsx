import React from "react";

interface CheckboxLabelProps {
  name: string;
  checked: boolean;
  onChange: (name:string, checked:boolean) => void;
  label: string;
  id: string;
}

export const CheckboxLabel: React.FC<CheckboxLabelProps> = ({
  name,
  checked,
  onChange,
  label,
  id,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        onChange(name, checked);
      };
    
  return (
    <div className="pass-generator-component__choose-container">
      <input
        id={id}
        className="pass-generator-component__checkbox"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id} className="pass-generator-component__choose-label">
        {label}
      </label>
    </div>
  );
};
