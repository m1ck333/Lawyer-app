import Form from "../components/UI/Form";
import DialogBtn from "../components/UI/DialogModal";
import { FormInput } from "../types";
import useCreateUser from "../hooks/useCreateUser";
import ListOfUsers from "../components/ListOfUsers";

const AdminPanel = () => {
  const {
    errors,
    handleCreateUser,
    isLoading,
    name,
    setName,
    surname,
    setSurname,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
  } = useCreateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateUser({ name, surname, username, email, password });
  };

  const formInputs: FormInput[] = [
    {
      label: "Name",
      error: errors["name"],
      placeholder: "New user's name",
      value: name,
      type: "text",
      onChange: (e) => setName(e.target.value),
      htmlType: "input",
    },
    {
      label: "Surname",
      error: errors["surname"],
      placeholder: "New user's surname",
      value: surname,
      type: "text",
      onChange: (e) => setSurname(e.target.value),
      htmlType: "input",
    },
    {
      label: "Username",
      error: errors["username"],
      placeholder: "New user's username",
      value: username,
      type: "text",
      onChange: (e) => setUsername(e.target.value),
      htmlType: "input",
    },

    {
      label: "Email",
      error: errors["email"],
      placeholder: "New user's email",
      value: email,
      type: "email",
      onChange: (e) => setEmail(e.target.value),
      htmlType: "input",
    },
    {
      label: "Password",
      error: errors["password"],
      placeholder: "Your password",
      value: password,
      type: "password",
      onChange: (e) => setPassword(e.target.value),
      htmlType: "input",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10">Admin panel</h1>

      <DialogBtn buttonName="Create new user" title="Create new user">
        <Form
          formInputs={formInputs}
          onSubmitHandler={handleSubmit}
          submitButtonName="Create"
          isLoading={isLoading}
        />
      </DialogBtn>

      <ListOfUsers />
    </div>
  );
};

export default AdminPanel;
