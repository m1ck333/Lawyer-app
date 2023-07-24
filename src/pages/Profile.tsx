import useProfile from "../hooks/useProfile";
import Form from "../components/UI/Form";

const Profile = () => {
  const { formInputs, updateProfile, isLoading } = useProfile();

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-3xl font-bold mb-10">My profile</h1>

      <div className="w-full">
        <Form
          classes="w-max"
          formInputs={formInputs}
          onSubmitHandler={updateProfile}
          submitButtonName={"Update profile"}
          isLoading={isLoading}
        ></Form>
      </div>
    </div>
  );
};

export default Profile;
