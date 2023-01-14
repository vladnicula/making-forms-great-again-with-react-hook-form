import { useMemo } from "react"

export const UsernameStatusHelper = (props: {
  value: string;
  error?: string;
}) => {
    const innerText = useMemo(() => {
        if (props.value === "pending") {
            return <span className="label-text-alt text-warning">Loading</span>
        }
        if (props.error) {
            return <span className="label-text-alt text-error">{props.error}</span>
        }

        if (props.value) {
            return (
                <span className="label-text-alt text-success">
                    username is available
                </span>
            )
        }
        return (
            <span className="label-text-alt">username must be min 3 char long</span>
        )
    }, [props.error, props.value])

    return <label className="label">{innerText}</label>
}
