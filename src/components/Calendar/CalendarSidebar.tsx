import { FormInput, EventTypes } from "../../types";
import DialogModal from "../UI/DialogModal";
import Form from "../UI/Form";
import MiniCalendar from "./MiniCalendar";
import Checkbox from "../UI/Checkbox";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { toggleSelectedEventType } from "../../redux/slices/eventSlice";
import { EVENT_TYPE_COLORS } from "../../constants";

type Props = {
  isCreateEventModalOpen: boolean;
  handleEventModalClose: () => void;
  formInputs: FormInput[];
  handleCreateEvent: (e: React.FormEvent, type: "create" | "update") => void;
  isLoading: boolean;
  monthIndex: number;
  year: number;
  eventTypesArray: EventTypes[];
  formAdditionalFields: () => JSX.Element;
};

const CalendarSidebar = ({
  isCreateEventModalOpen,
  handleEventModalClose,
  formInputs,
  handleCreateEvent,
  isLoading,
  monthIndex,
  year,
  eventTypesArray,
  formAdditionalFields,
}: Props) => {
  const selectedEventTypes = useAppSelector(
    (state) => state.events.selectedEventTypes
  );

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center p-4 gap-4 w-1/5 bg-main-light text-main-dark">
      <DialogModal
        buttonName="Create Event"
        title="Create Event"
        isOpenDialog={isCreateEventModalOpen}
        onClose={handleEventModalClose}
      >
        <div className="flex flex-col items-center">
          <Form
            classes="w-max"
            formInputs={formInputs}
            onSubmitHandler={(e) => handleCreateEvent(e, "create")}
            submitButtonName="Create"
            isLoading={isLoading}
            additionalFields={formAdditionalFields}
          />
        </div>
      </DialogModal>

      <MiniCalendar monthIndex={monthIndex} year={year} />

      <div className="self-start">
        <h2 className="font-bold text-lg mb-2">Event types:</h2>

        {eventTypesArray.map((eventType) => (
          <Checkbox
            key={eventType}
            id={eventType}
            label={eventType}
            isChecked={selectedEventTypes.includes(eventType)}
            color={EVENT_TYPE_COLORS[eventType]}
            onChange={() => dispatch(toggleSelectedEventType(eventType))}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarSidebar;
