import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useRef } from "react"
import { Button } from "react-daisyui"
import { SignUpForm, SignUpFormAPI, SignUpValues } from "../src/SignUpForm/SignUpForm"

export default function SignUpPage () {
    const router = useRouter()
    const myRef = useRef<SignUpFormAPI>(null)

    const routerRef = useRef(router)
    routerRef.current = router

    const handleApiSubmission = useCallback(async (data: SignUpValues) => {
        // fetch should be in a separate layer
        const httpRes = await fetch('/api/sign-up', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })

        const jsonRes = await httpRes.json()
        if ( jsonRes.success === false ) {
            // handle errors
            myRef.current?.setErrors(jsonRes.errors)
            return
        }

        routerRef.current.replace("/")

    }, [])
    
    return (
        <div>
            <SignUpForm 
                ref={myRef} 
                onSubmitReady={handleApiSubmission} 
                footer={<Link href={'/login'}><Button>Login</Button></Link>}
            />
        </div>
    )
}
