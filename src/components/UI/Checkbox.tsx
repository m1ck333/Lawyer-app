interface CheckboxProps {
  id: string;
  label: string;
  isChecked: boolean;
  color: string;
  onChange: () => void;
}

const Checkbox = ({ id, label, isChecked, color, onChange }: CheckboxProps) => {
  return (
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        className={`h-6 w-6 rounded-full`}
        style={{ color: color, border: "2px solid " + color }}
        onChange={onChange}
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-main-dark">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>
    </div>
  );
};

export default Checkbox;
