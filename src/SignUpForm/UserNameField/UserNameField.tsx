import { useState, useRef, useCallback, useMemo } from "react"
import { Input } from "react-daisyui"
import {
    FieldValues,
    PathValue,
    Path,
    ControllerFieldState,
    ControllerRenderProps
} from "react-hook-form"
import { z } from "zod"

import { UsernameStatusHelper } from "./UserNameStatusHelper"

interface UsernameFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState: ControllerFieldState;
  fieldSchema: z.ZodString | z.ZodEffects<z.ZodString, string, string>;
  isValidUserName: (input: PathValue<T, Path<T>>) => Promise<boolean>;
}

export const UserNameField = <T extends FieldValues>(
    props: UsernameFieldProps<T>
) => {
    const { field, fieldState } = props
    const { error } = fieldState
    const [internalValue, setInternalValue] = useState(field.value)

    const internalValueRef = useRef(internalValue)
    internalValueRef.current = internalValue

    const fieldSchemaRef = useRef(props.fieldSchema)
    fieldSchemaRef.current = props.fieldSchema

    const fieldRef = useRef(props.field)
    fieldRef.current = props.field

    const isValidUserNameRef = useRef(props.isValidUserName)
    isValidUserNameRef.current = props.isValidUserName

    const delayedCheckValidUsername = useCallback(() => {
        const localFieldValue = internalValueRef.current
        const localFieldRef = fieldRef.current

        isValidUserNameRef.current(localFieldValue).then((isValid) => {
            localFieldRef.onChange(isValid ? localFieldValue : "null")
        })
    }, [])

    const to = useRef<number>()
    const handleInputFieldChange: React.ChangeEventHandler<HTMLInputElement> = (
        ev
    ) => {
        const newFieldValue = ev.target.value
        setInternalValue(
      // TODO how to make sense of this type error?
      (newFieldValue as unknown) as PathValue<T, Path<T>>
        )
        const localValidationResult = fieldSchemaRef.current.safeParse(
            newFieldValue
        )
        if (localValidationResult.success) {
            field.onChange("pending")
            clearTimeout(to.current)
            to.current = (setTimeout(
                delayedCheckValidUsername,
                500
            ) as unknown) as number
        } else {
            field.onChange(newFieldValue)
        }
    }

    const inputBorderColor = useMemo(() => {
        if (field.value === "pending") {
            return "warning" as const
        }

        if (field.value === "null") {
            return "error" as const
        }

        if (error) {
            return "error" as const
        }

        if (!field.value) {
            return "ghost" as const
        }

        return "success" as const
    }, [field, error])

    const finalErrorMessage = useMemo(() => {
        if (error) {
            return error.message
        }

        if (field.value === "null") {
            return "Username already taken"
        }
    }, [error, field])

    return (
        <div className="form-control w-full max-w-xs">
            <label htmlFor={field.name} className="label">
                <span className="label-text">Username</span>
            </label>
            <Input
                color={inputBorderColor}
                id={field.name}
                ref={field.ref}
                type="text"
                value={internalValue}
                onChange={handleInputFieldChange}
            />
            <UsernameStatusHelper value={field.value} error={finalErrorMessage} />
        </div>
    )
}
