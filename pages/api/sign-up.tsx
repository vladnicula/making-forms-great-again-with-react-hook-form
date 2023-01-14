import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body as Record<string, string>

    console.log("POST /sign-up", req.body, { email, password })

    if ( email === 'bob@gmail.com') {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // TODO what is the corect staus code here
        res.status(200).json({
            success: false,
            errors: {
                "email": "email not available"
            }
        })
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    res.status(200).json({
        success: true
    })
}
