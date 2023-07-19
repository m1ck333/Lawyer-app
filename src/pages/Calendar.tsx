import DialogModal from "../components/UI/DialogModal";
import CalendarHeader from "../components/Calendar/CalendarHeader";
import Form from "../components/UI/Form";
import MiniCalendar from "../components/Calendar/MiniCalendar";
import CalendarBody from "../components/Calendar/CalendarBody";
import useCalendar from "../hooks/useCalendar";

const Calendar = () => {
  const {
    handleDateClick,
    handleEventClick,
    isCreateEventModalOpen,
    isViewEventModalOpen,
    handleEventModalClose,
    formInputs,
    handleCreateEvent,
    handleDeleteEvent,
    isLoading,
    events,
    monthIndex,
    year,
  } = useCalendar();

  // const handleFormSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   handleCreateEvent();
  // };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
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
            />
          </div>
        </DialogModal>

        <MiniCalendar monthIndex={monthIndex} year={year} />
      </div>

      <div className="flex-1">
        <div className="mx-auto px-4 py-8">
          <CalendarHeader year={year} monthIndex={monthIndex} />

          <CalendarBody
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            events={events}
            monthIndex={monthIndex}
            year={year}
          />
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
