import { FormInput } from "../../types";
import LoadingSpinnerBtn from "./LoadingSpinnerBtn";

type Props = {
  classes?: string;
  formInputs: FormInput[];
  onSubmitHandler: (event: React.FormEvent) => void;
  submitButtonName: string;
  isLoading?: boolean;
  additionalButtons?: JSX.Element[];
};

const Form = ({
  classes,
  formInputs,
  onSubmitHandler,
  submitButtonName,
  isLoading = false,
  additionalButtons,
}: Props) => {
  return (
    <form
      className={`bg-main-light text-main-dark shadow-md rounded px-4 py-3 mb-4 w-full max-w-xl ${classes}`}
      onSubmit={onSubmitHandler}
    >
      {formInputs.map((input) => (
        <div className="mb-4" key={input.label}>
          <label className="block text-sm font-bold mb-2">{input.label}</label>

          {input.htmlType === "input" ? (
            <input
              className={`shadow appearance-none border ${
                input.error ? "border-red-500" : ""
              } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
              type={input.type}
              placeholder={input.placeholder}
              value={input.value}
              onChange={(e) => input.onChange(e)}
            />
          ) : (
            <textarea
              cols={30}
              rows={10}
              placeholder={input.placeholder}
              value={input.value}
              onChange={(e) => input.onChange(e)}
            ></textarea>
          )}

          {input.error && (
            <p className="text-red-500 text-xs italic">{input.error}</p>
          )}
        </div>
      ))}

      <div className="flex items-center justify-center">
        {isLoading ? (
          <LoadingSpinnerBtn />
        ) : (
          <>
            <button type="submit" disabled={isLoading}>
              {submitButtonName}
            </button>

            {additionalButtons &&
              additionalButtons.map((element, i) => (
                <div key={i}>{element}</div>
              ))}
          </>
        )}
      </div>
    </form>
  );
};

export default Form;
