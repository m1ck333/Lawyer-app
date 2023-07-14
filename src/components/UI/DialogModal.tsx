import { Fragment, useState, ReactNode, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  children: ReactNode;
  buttonName: string | null;
  title: string;
  isOpenDialog?: boolean;
};

const DialogModal = ({
  children,
  buttonName,
  title,
  isOpenDialog = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(isOpenDialog);

  useEffect(() => {
    setIsOpen(isOpenDialog);
  }, [isOpenDialog]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {buttonName ? (
        <button type="button" onClick={openModal} className="">
          {buttonName}
        </button>
      ) : (
        ""
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-main-dark bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-minor-dark p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between items-center mb-4 text-lg font-medium leading-6 "
                  >
                    <h1 className="text-lg text-main-light">{title}</h1>

                    <button
                      type="button"
                      className="text-3xl"
                      onClick={closeModal}
                    >
                      &times;
                    </button>
                  </Dialog.Title>

                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DialogModal;
