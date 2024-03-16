import { FC } from "react";

interface InputProps {
  label: string;
  onChange: (e: any) => void;
  type: string;
  value: string;
  placeholder: string;
}

const Input: FC<InputProps> = ({
  label,
  onChange,
  type,
  value,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-md font-medium pb-1 text-gray-600 pl-1"
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        className="
        block
        rounded-md
        px-4
        pt-2
        pb-2
        w-full
        border
        border-gray-500
        text-gray-900
        bg-neutral-50
        focus:border-b-2
        focus:outline-0
        focus:ring-0
        appearance-none
        text-md
        "
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
