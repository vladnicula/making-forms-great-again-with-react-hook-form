import React from "react"
import Link from "next/link"

export default function HomePage () {
    return (
        <div>
            Hello World.
            <Link href="/sign-up">
                Sign Up
            </Link>
        </div>
    )
}
