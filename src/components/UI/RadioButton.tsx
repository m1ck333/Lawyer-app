import { EVENT_TYPE_COLORS } from "../../constants";
import { EventTypes } from "../../types";

interface RadioButtonProps {
  id: string;
  eventType: EventTypes[number];
  selectedEventType: EventTypes[number];
  name: string;
  onChange: (eventType: EventTypes[number]) => void;
}

const RadioButton = ({
  id,
  eventType,
  selectedEventType,
  name,
  onChange,
}: RadioButtonProps) => {
  const color = EVENT_TYPE_COLORS[eventType as keyof typeof EVENT_TYPE_COLORS];

  if (!color) {
    // Handle the case where eventType is not a valid key in EVENT_TYPE_COLORS
    return null;
  }

  const handleRadioButtonChange = () => {
    onChange(eventType);
  };

  return (
    <div className="flex items-center mb-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={eventType}
        checked={selectedEventType === eventType}
        onChange={handleRadioButtonChange}
        className={`h-6 w-6 rounded-full`}
        style={{ backgroundColor: color }}
      />

      <label htmlFor={id} className="ml-2 text-sm font-medium text-main-dark">
        {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
      </label>
    </div>
  );
};

export default RadioButton;
