import { Button } from "react-daisyui"
import { useForm } from "react-hook-form"
import { TextField } from "../components/TextField/TextField"
import { zodResolver } from '@hookform/resolvers/zod'

import * as z from 'zod'
import { forwardRef, useImperativeHandle, useRef } from "react"


const SignUpFormSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(5).max(24),
    confirmPassword: z.string().min(5).max(24)
}).refine((values) => {
    return values.confirmPassword === values.password
}, {
    message: "Confirm password must be the same as password",
    path: ['confirmPassword']
})

export type SignUpValues = z.infer<typeof SignUpFormSchema>

export interface SignUpFormAPI {
    setErrors: (errors: Record<string, string>) => void
}

export interface SignUpFormProps {
    onSubmitReady: (data: SignUpValues) => Promise<unknown>
    footer?: React.ReactNode
}

export const SignUpForm = forwardRef<SignUpFormAPI, SignUpFormProps>((props, ref) => {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<SignUpValues>({
        resolver: zodResolver(SignUpFormSchema)
    })

    const setErrorRef = useRef(setError)
    setErrorRef.current = setError

    useImperativeHandle(ref, () => {
        return {
            setErrors: (data: Record<string, string>) => {
                Object.keys(data).forEach((key) => {
                    const typesafeKey = key as keyof SignUpValues
                    setErrorRef.current(typesafeKey, {
                        message: data[typesafeKey],
                        type: "custom"
                    })
                })
            }
        }
    }, [])

    return (
        <form
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                gap: 20
            }}
            onSubmit={handleSubmit(props.onSubmitReady)}
        >
            <h1>Sign Up</h1>
            <TextField
                id='email'
                label="Email"
                inputProps={register('email')}
                error={errors.email?.message as string}
            />

            <TextField
                id='password'
                label="Password"
                inputProps={register('password')}
                error={errors.password?.message as string}
            />

            <TextField
                id='confirmPassword'
                label="Confirm Password"
                inputProps={register('confirmPassword')}
                error={errors.confirmPassword?.message as string}
            />

            <Button color="primary" disabled={isSubmitting}>{
                isSubmitting ? "Hold up" : "Submit"
            }</Button>
            
            {props.footer}
            
        </form>
    )
})


SignUpForm.displayName = 'ForwardedSignUpForm'