import DialogModal from "../components/UI/DialogModal";
import CalendarHeader from "../components/Calendar/CalendarHeader";
import CalendarDay from "../components/Calendar/CalendarDay";
import Form from "../components/UI/Form";
import useCalendar from "../hooks/useCalendar";
import { TrashIcon } from '@heroicons/react/20/solid';
import MiniCalendar from "../components/Calendar/MiniCalendar";

const Calendar = () => {
  const {
    handleDateClick,
    isEventModalOpen,
    handleEventModalClose,
    selectedDate,
    selectedEvents,
    formInputs,
    handleCreateOrUpdateEvent,
    handleDeleteEvent,
    isLoading,
    events,
    monthIndex,
  } = useCalendar();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateOrUpdateEvent();
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="flex flex-col items-center p-4 gap-4 w-1/5 bg-main-light text-main-dark">
        <DialogModal
          buttonName="Create Event"
          title="Event Details"
          isOpenDialog={isEventModalOpen}
          onClose={handleEventModalClose}
        >
          <div className="flex flex-col items-center">
            {/* Display selected events for the clicked day */}
            {selectedEvents.map((event) => (
              <div key={event.id} className="flex justify-between mb-10">
                <div className="flex flex-col items-start">
                  <p>{event.title}</p>
                  <p>{event.description}</p>
                </div>

                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            ))}

            <Form
              classes="w-max"
              formInputs={formInputs}
              onSubmitHandler={handleFormSubmit}
              submitButtonName={selectedDate ? "Update" : "Create"}
              isLoading={isLoading}
            />
          </div>
        </DialogModal>

        <MiniCalendar
          monthIndex={monthIndex}
        />
      </div>

      <div className="flex-1">
        <div className="mx-auto px-4 py-8">
          <CalendarHeader />

          <CalendarDay
            onDateClick={handleDateClick}
            events={events}
            monthIndex={monthIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
