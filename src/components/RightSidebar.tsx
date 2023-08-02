import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";

import { useAppSelector } from "../redux/hooks";
import useCalendar from "../hooks/useCalendar";
import { Event } from "../types";
import { EVENT_TYPE_COLORS } from "../constants";
import { getNextSevenDaysWithEvents } from "../utils";
import DialogModal from "./UI/DialogModal";
import Form from "./UI/Form";
import RadioButton from "./UI/RadioButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const RightSidebar = ({ isOpen, onClose }: Props) => {
  const {
    isLoadingEvents,
    formInputs,
    handleDeleteEvent,
    isLoading,
    handleCreateEvent,
    eventTypesArray,
    eventType,
    setEventType,
    handleEventClick,
    handleEventModalClose,
    isViewEventModalOpen,
  } = useCalendar();

  const events = useAppSelector((state) => state.events.events);
  
  const formAdditionalFields = () => {
    return (
      <div className="flex flex-col">
        {eventTypesArray.map((eventTypeArray) => (
          <RadioButton
            key={eventTypeArray}
            id={eventTypeArray}
            name="type"
            eventType={eventTypeArray}
            selectedEventType={eventType}
            onChange={setEventType}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-screen z-10 bg-minor-dark w-64 p-4 border-2 border-main-light ${
          isOpen && !isLoadingEvents ? "flex flex-col" : "hidden"
        }`}
        style={{
          animation: `${isOpen ? "slideIn 0.5s ease-in-out" : ""}`,
        }}
      >
        {/* Sidebar Content */}
        <div className={`h-full ${isOpen ? "flex flex-col" : "hidden"}`}>
          <p className="text-main-light p-4 font-extrabold text-lg underline">
            Calendar for the next 7 days:
          </p>

          <div className="flex flex-col grow no-scrollbar overflow-y-auto">
            {getNextSevenDaysWithEvents(events).map(
              ({ date, events }, index) => (
                <div key={index} className="text-main-light p-4 grow">
                  <p className="font-bold">{date}</p>

                  {events.length > 0 ? (
                    <ul className="text-main-light flex flex-col">
                      {events.map((event: Event) => (
                        <li
                          key={event.id}
                          className=""
                          onClick={(e) => handleEventClick(event, e)}
                        >
                          <span
                            className="inline-block px-2 rounded text-sm font-semibold text-main-light w-full cursor-pointer"
                            style={{
                              background: EVENT_TYPE_COLORS[event.type],
                            }}
                          >
                            {event.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-main-light opacity-50">
                      No events for this date.
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Close Sidebar Button Container */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 left-0 w-full text-center ${
            isOpen ? "" : "hidden"
          }`}
        >
          <ArrowRightCircleIcon
            className="w-6 h-6 cursor-pointer"
            onClick={onClose}
          />
        </div>
      </div>

      {/* DialogModal */}
      <DialogModal
        buttonName=""
        title="Event Details"
        isOpenDialog={isViewEventModalOpen}
        onClose={handleEventModalClose}
      >
        <div className="flex flex-col gap-2 items-center">
          <div className="flex flex-col items-center">
            <Form
              classes="w-max"
              formInputs={formInputs}
              onSubmitHandler={(e) => {
                handleCreateEvent(e, "update");
              }}
              submitButtonName="Update"
              isLoading={isLoading}
              additionalFields={formAdditionalFields}
              additionalButtons={[
                <button
                  className="ml-1 !bg-red-500 hover:!bg-red-300"
                  type="button"
                  onClick={() => handleDeleteEvent()}
                >
                  Delete
                </button>,
              ]}
            />
          </div>
        </div>
      </DialogModal>
    </>
  );
};

export default RightSidebar;
