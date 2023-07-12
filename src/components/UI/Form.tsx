import { FormInput } from "../../types";
import LoadingSpinner from "./LoadingSpinner";
import LoadingSpinnerBtn from "./LoadingSpinnerBtn";

type Props = {
  formInputs: FormInput[];
  onSubmitHandler: (event: React.FormEvent) => void;
  submitButtonName: string;
  isLoading: boolean;
};

const Form = ({
  formInputs,
  onSubmitHandler,
  submitButtonName,
  isLoading,
}: Props) => {
  return (
    <form
      className="bg-main-light text-main-dark shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xl"
      onSubmit={onSubmitHandler}
    >
      {formInputs.map((input) => (
        <div className="mb-4" key={input.label}>
          <label className="block text-sm font-bold mb-2">{input.label}</label>

          <input
            className={`shadow appearance-none border ${
              input.error ? "border-red-500" : ""
            } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
            type={input.type}
            placeholder={input.placeholder}
            value={input.value}
            onChange={(e) => input.onChange(e)}
          />

          {input.error && (
            <p className="text-red-500 text-xs italic">{input.error}</p>
          )}
        </div>
      ))}

      <div className="flex items-center justify-center">
        {isLoading ? (
          <LoadingSpinnerBtn />
        ) : (
          <button type="submit" disabled={isLoading}>
            {submitButtonName}
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
