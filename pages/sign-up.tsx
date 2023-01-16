/**
 * The component system  intro, copy pastable before the form is created
 */

import { useRef } from "react"
import { useRouter } from "next/router"
import { SignUpApi, SignUpForm, SignupFormValues } from "../src/SignUpForm/SignUpForm"
import { Button } from "react-daisyui"
import Link from "next/link"

export default function SignUpPage () {

    const signupFormRef = useRef<SignUpApi>(null)
    const router = useRouter()
    const handleSubmit = async (data: SignupFormValues) => {
        console.log("hadnle submit ready data", data    )
        const httpRespose = await fetch('/api/sign-up',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
        const jsonRespose = await httpRespose.json()
        if ( !jsonRespose.success ) {
            signupFormRef.current?.setErrors(jsonRespose.errors)
            return
        }

        router.replace('/')
        await new Promise((resolve) => setTimeout(resolve, 500))

    }

    return (
        <SignUpForm 
            ref={signupFormRef}
            onSubmitReady={handleSubmit}
            suffix={
                (
                    <Link href="/login">
                        <Button 
                            color="secondary">
                            Login In
                        </Button>
                    </Link>
                )
            }
        />
    )
}


