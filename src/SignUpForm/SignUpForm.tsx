/**
 * The component system  intro, copy pastable before the form is created
 */
import { useForm } from "react-hook-form"
import { TextField } from "../components/TextField"

import * as z from "zod"
import {zodResolver}  from '@hookform/resolvers/zod'
import { forwardRef, useImperativeHandle, useRef } from "react"
import { Button } from "react-daisyui"

const SingupSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(6).max(24),
    confirmPassword: z.string().min(6).max(24),
}).refine(
    (form) => {
        return form.confirmPassword === form.password
    },
    {
        message: "Passwords must match",
        path: ["confirmPassword"]
    }
)

export type SignupFormValues = z.infer<typeof SingupSchema>

interface SignUpFormProps {
    onSubmitReady: (data: SignupFormValues) => Promise<void>
    suffix: React.ReactElement
}

export interface SignUpApi {
    setErrors: (errors: Record<string, string>) => void
}

export const SignUpForm = forwardRef<SignUpApi, SignUpFormProps>((props, ref) => {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SignupFormValues>({
        resolver: zodResolver(SingupSchema)
    })

    const setErrorRef = useRef(setError)
    setErrorRef.current = setError
    useImperativeHandle(ref, () => {
        return {
            setErrors: (errors: Record<string, string>) => {
                Object.entries(errors).forEach(([key, value]) => {
                    setErrorRef.current(key as "email" | "password" | "confirmPassword", {message: value})
                })
            }
        }
    }, [])

    return (
        <form
            style={{
                display: "flex",
                flexFlow: "column",
                gap: 15,
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}
            onSubmit={handleSubmit(props.onSubmitReady)}
        >
            <h2>Sign Up</h2>
            <TextField 
                id='email'
                label="email"
                inputProps={register("email")}
                error={errors.email?.message as string}
            />

            <TextField 
                id='password'
                label="password"
                type="password"
                inputProps={register("password")}
                error={errors.password?.message as string}
            />

            <TextField 
                id='confirm-password'
                label="confirm-password"
                type="password"
                inputProps={register("confirmPassword")}
                error={errors.confirmPassword?.message as string}
            />

            <Button disabled={isSubmitting} color="primary">
                {isSubmitting ? "Sending..." : "Register"}
            </Button>

            {props.suffix}
        </form>
    )
})


SignUpForm.displayName = 'ForwardRefedSignUpForm'
