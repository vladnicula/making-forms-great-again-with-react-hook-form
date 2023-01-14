import { Input } from "react-daisyui";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps {
  name: string;
  id?: string;
  type?: string;
  label: string;
  error?: string;
  inputProps: UseFormRegisterReturn<string>;
}

export const TextField = (props: TextFieldProps) => {
  const id = props.id ?? props.name;
  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor={id} className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <Input
        color={props.error ? "error" : "ghost"}
        id={id}
        type={props.type ?? "text"}
        {...props.inputProps}
      />
      {props.error && (
        <span className="label-text text-error">{props.error}</span>
      )}
    </div>
  );
};
