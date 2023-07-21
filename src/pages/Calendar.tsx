import DialogModal from "../components/UI/DialogModal";
import CalendarHeader from "../components/Calendar/CalendarHeader";
import Form from "../components/UI/Form";
import CalendarBody from "../components/Calendar/CalendarBody";
import useCalendar from "../hooks/useCalendar";
import CalendarSidebar from "../components/Calendar/CalendarSidebar";
import RadioButton from "../components/UI/RadioButton";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Calendar = () => {
  const {
    handleDateClick,
    handleEventClick,
    isCreateEventModalOpen,
    isViewEventModalOpen,
    eventType,
    setEventType,
    handleEventModalClose,
    formInputs,
    handleCreateEvent,
    handleDeleteEvent,
    isLoading,
    isLoadingEvents,
    monthIndex,
    year,
    eventTypesArray,
  } = useCalendar();

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
    <div className="flex h-screen w-screen">
      <CalendarSidebar
        isCreateEventModalOpen={isCreateEventModalOpen}
        handleEventModalClose={handleEventModalClose}
        formInputs={formInputs}
        handleCreateEvent={handleCreateEvent}
        isLoading={isLoading}
        monthIndex={monthIndex}
        year={year}
        eventTypesArray={eventTypesArray}
        formAdditionalFields={formAdditionalFields}
      />

      <div className="flex-1">
        <div className="mx-auto px-4 py-8">
          <CalendarHeader year={year} monthIndex={monthIndex} />

          {/* Pass the filteredEvents instead of events */}
          {isLoadingEvents ? (
            <LoadingSpinner />
          ) : (
            <CalendarBody
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
              monthIndex={monthIndex}
              year={year}
            />
          )}
        </div>
      </div>

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
    </div>
  );
};

export default Calendar;
