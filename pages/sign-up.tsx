import { useRouter } from 'next/router'
import { SignUpForm, SignUpFormType } from "../src/SignUpForm/SignUpForm"

export default function SignUpPage () {
    const router = useRouter()
    const handleValidSubmit = async (data: SignUpFormType) => {
        const httpResponse = await fetch('/api/sign-up', {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })

        const jsonResponse = await httpResponse.json() as {
            success: true,
        } | {
            success: false,
            errors: Record<string, string>
        }

        if ( !jsonResponse.success ) {
            console.log("handle server errors")
            return
        }

        router.replace('/')
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const checkUserNameAvailability = async(username: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return username.toLowerCase() !== "bob"
    }

    return (
        <SignUpForm
            isValidUserName={checkUserNameAvailability}
            onSubmit={handleValidSubmit} 
        />
    )
}
