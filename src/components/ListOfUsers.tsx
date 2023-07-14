import { Menu, Switch } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import useUserList from "../hooks/useUserList";
import Spinner from "./UI/Spinner";
import { Roles } from "../types";

const ListOfUsers = () => {
  const {
    users,
    handleInputChange,
    handleSaveChanges,
    handleToggleBlock,
    handleRoleSelection,
    isLoading,
  } = useUserList();

  return (
    <div className="flex flex-col items-center mt-10">
      <h3 className="text-lg">List of users</h3>

      <table className="mt-4 w-full text-main-dark bg-main-light">
        <thead>
          <tr className="border-b border-main-dark">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Surname</th>
            <th className="p-2">Username</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Active</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2">{user.id}</td>

              <td className="p-2">
                <input
                  type="text"
                  value={user.name}
                  onChange={(event) =>
                    handleInputChange(event, user.id, "name")
                  }
                />
              </td>

              <td className="p-2">
                <input
                  type="text"
                  value={user.surname}
                  onChange={(event) =>
                    handleInputChange(event, user.id, "surname")
                  }
                />
              </td>

              <td className="p-2">
                <input
                  type="text"
                  value={user.username}
                  onChange={(event) =>
                    handleInputChange(event, user.id, "username")
                  }
                />
              </td>

              <td className="p-2">
                <input
                  type="text"
                  value={user.email}
                  onChange={(event) =>
                    handleInputChange(event, user.id, "email")
                  }
                />
              </td>

              <td className="p-2">
                <Menu as="div" className="relative">
                  <Menu.Button className="border border-main-dark px-2 py-1 rounded capitalize w-full flex justify-between">
                    {user.selectedRole || user.role}
                    <ChevronDownIcon className="h-6" />
                  </Menu.Button>

                  <Menu.Items className="absolute z-10 w-32 mt-2 origin-top-right divide-y divide-main-light rounded-md bg-main-light shadow-lg ring-1 ring-main-dark ring-opacity-5 focus:outline-none">
                    {(Object.keys(Roles) as (keyof typeof Roles)[]).map(
                      (role, i) => {
                        return (
                          <div key={i} className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } w-full px-4 py-2 text-sm text-left capitalize`}
                                  onClick={() =>
                                    handleRoleSelection(user.id, Roles[role])
                                  }
                                >
                                  {Roles[role]}
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        );
                      }
                    )}
                  </Menu.Items>
                </Menu>
              </td>

              <td className="p-2">
                <Switch
                  checked={!user.isActive}
                  onChange={() => handleToggleBlock(user.id)}
                >
                  <span className="bg-main-light rounded shadow p-1 h-6 w-10 flex">
                    <span
                      className={`block h-full w-1/2 rounded transition duration-300 ease-in-out transform ${
                        !user.isActive
                          ? "bg-red-500 translate-x-full"
                          : "bg-green-500"
                      }`}
                    ></span>
                  </span>
                </Switch>
              </td>

              <td className="p-2">
                <button
                  className="w-24"
                  onClick={() => handleSaveChanges(user.id)}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : "Update"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfUsers;
