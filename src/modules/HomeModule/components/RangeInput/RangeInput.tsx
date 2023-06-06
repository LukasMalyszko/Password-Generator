import React, { ChangeEvent, useRef } from "react";

interface RangeInputProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export const RangeInput: React.FC<RangeInputProps> = ({
  value,
  min,
  max,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = inputRef.current;

    const newValue = parseInt(event.target.value);
    onChange(newValue);

    const progress = (newValue / max) * 100;
    input?.style.setProperty("--progress-percent", `${progress}%`);
  };

  return (
      <input
        ref={inputRef}
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
      />
  );
};


