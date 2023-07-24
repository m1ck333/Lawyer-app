import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/20/solid";

import { DropDownButton } from "../../types";

type Props = {
  buttonName: string;
  dropDownButtons: DropDownButton[];
  needArrowDown: boolean;
};

const DropdownBtn = ({ buttonName, dropDownButtons, needArrowDown }: Props) => {
  const renderMuneItem = (dropDownButton: DropDownButton, active: boolean) => {
    return dropDownButton.to ? (
      <Link to={dropDownButton.to}>
        <button
          className={`${
            active ? "bg-minor-dark " : ""
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          {dropDownButton.label}{" "}
        </button>
      </Link>
    ) : (
      <button
        className={`${
          active ? "bg-minor-dark " : ""
        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        onClick={dropDownButton.onClick}
      >
        {dropDownButton.label}
      </button>
    );
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-main-dark bg-opacity-20 px-4 py-2  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-main-light focus-visible:ring-opacity-75">
          {buttonName === "Profile" ? (
            <UserCircleIcon className="w-8" />
          ) : (
            buttonName
          )}

          {needArrowDown ? (
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          ) : (
            ""
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-main-light rounded-md bg-main-light shadow-lg ring-1 ring-main-dark ring-opacity-5 focus:outline-none">
          {dropDownButtons.map((dropDownButton) => (
            <div key={dropDownButton.label} className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => renderMuneItem(dropDownButton, active)}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownBtn;
