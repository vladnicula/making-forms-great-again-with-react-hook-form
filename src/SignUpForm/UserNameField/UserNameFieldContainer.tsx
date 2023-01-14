import {
    FieldValues,
    Control,
    Path,
    PathValue,
    Controller
} from "react-hook-form"
import { z } from "zod"
import { UserNameField } from "./UserNameField"

interface UsernameFieldContinerProps<T extends FieldValues> {
  control: Control<T, any>;
  name: Path<T>;
  fieldSchema: z.ZodString | z.ZodEffects<z.ZodString, string, string>;
  isValidUserName: (input: PathValue<T, Path<T>>) => Promise<boolean>;
}

export const UserNameFieldContainer = <T extends FieldValues>(
    props: UsernameFieldContinerProps<T>
) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field, fieldState }) => (
                <UserNameField
                    field={field}
                    fieldState={fieldState}
                    fieldSchema={props.fieldSchema}
                    isValidUserName={props.isValidUserName}
                />
            )}
        />
    )
}
