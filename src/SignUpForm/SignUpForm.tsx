import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Form } from "react-daisyui"

import { TextField } from "../components/form/TextField"
import { forwardRef, useImperativeHandle } from "react"
// import { UserNameFieldContainer } from "./UserNameField/UserNameFieldContainer"

// const usernameSchema = z.string().superRefine((input, ctx) => {
//     if (input.length < 3) {
//         ctx.addIssue({
//             code: z.ZodIssueCode.too_small,
//             type: "string",
//             fatal: true,
//             minimum: 3,
//             inclusive: true,
//             message: "Username mus tbe at least 3 character long"
//         })

//         return z.NEVER
//     }

//     if (input === "null") {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "Username already taken",
//             fatal: true
//         })

//         return z.NEVER
//     }

//     if (input === "pending") {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "Checking username",
//             fatal: true
//         })

//         return z.NEVER
//     }
// })

const formSchema = z
    .object({
        email: z.string().email(),
        // username: usernameSchema,
        password: z.string().min(3).max(24),
        confirmPassword: z.string().min(3).max(24)
    })
    .refine(
        (form) => {
            return form.confirmPassword === form.password
        },
        {
            message: "Passwords must match",
            path: ["confirmPassword"]
        }
    )

export type SignUpFormType = z.infer<typeof formSchema>;

interface SignUpFormProps {
  onSubmit: (data: SignUpFormType) => Promise<unknown>;
  isValidUserName: (input: string) => Promise<boolean>;
}

const DefaultValues = {
    username: "",
    password: ""
}

export interface SignUpFormRefApi {
    setFieldError: (fieldName:string, errorMessage: string) => boolean
    setFieldErrors: (errors: Record<keyof SignUpFormType, string>) => void
}

export const SignUpForm = forwardRef<SignUpFormRefApi, SignUpFormProps>((props, ref) => {
    const {
        // control,
        setError,
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignUpFormType>({
        defaultValues: DefaultValues,
        resolver: zodResolver(formSchema)
    // resolver: async (data, context, options) => {
    //   // you can debug your validation schema here
    //   // console.log("formData", data);
    //   const result = await zodResolver(formSchema)(data, context, options);
    //   // console.log("validation result", result.values, result.errors);
    //   return result;
    // }
    })

    useImperativeHandle(ref, () => {
        const setFieldError = (fieldName: string, errorMessage: string) => {
            setError(fieldName as keyof SignUpFormType, {
                message: errorMessage
            })
            return true
        }
        return {
            setFieldError,

            setFieldErrors: (errors: Record<keyof SignUpFormType, string>) => {
                Object.keys(errors).forEach((key) => {
                    const typesafeKey = key as keyof SignUpFormType
                    setFieldError(typesafeKey, errors[typesafeKey])
                })
            }
        }
    })

    console.log("form component function ran", isSubmitting)

    return (
        <Form
            style={{
                display: "flex",
                flexFlow: "column",
                gap: 15,
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}
            onSubmit={handleSubmit(props.onSubmit)}
        >
            <TextField
                name="email"
                label="Email"
                type="email"
                inputProps={register("email")}
                error={errors.email?.message}
            />
            {/* <UserNameFieldContainer
                isValidUserName={props.isValidUserName}
                fieldSchema={usernameSchema}
                control={control}
                name="username"
            /> */}
            <TextField
                name="password"
                label="Password"
                type="password"
                inputProps={register("password")}
                error={errors.password?.message}
            />
            <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                inputProps={register("confirmPassword")}
                error={errors.confirmPassword?.message}
            />
            <br />
            <Button disabled={isSubmitting} color="primary">
                {isSubmitting ? "Sending..." : "Register"}
            </Button>
        </Form>
    )
})


SignUpForm.displayName = 'ForwardRefSignUpForm'