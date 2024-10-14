import z from 'zod'

const mailScheme = z.object({
    email_id_client: z.string({
        invalid_type_error: "The email recipient must be a string",
        required_error: "The email recipient is required",
    }),
    email: z.string({
        invalid_type_error: "The email subject must be a string",
        required_error: "The email subject is required",
    })
})


export function validateEmail(input) {
    return mailScheme.safeParse(input);
}
