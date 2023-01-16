import { Input } from "react-daisyui"

export default function SignUpPage () {
    return (
        <div
            style={{
                display: "flex",
                flexFlow: "column",
                gap: 15,
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}
        >
            SignUpForm Here
            <div className="form-control w-full max-w-xs">
                <label htmlFor={'email'} className="label">
                    <span className="label-text">email</span>
                </label>
                <Input
                    color={"ghost"}
                    id={'email'}
                    type={"text"}
                />
                <span className="label-text text-error">An error</span>
            </div>
        </div>
    )
}
