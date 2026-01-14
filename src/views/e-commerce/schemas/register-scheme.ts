import { z } from "zod";

const errorMessages = {
    string: "Please, enter a valid value.",
};
export const registerSchema = z.object({
    firstName: z
        .string({ error: errorMessages.string })
        .min(2, "Firstname must be at least 2 characters.")
        .max(50, "Firstname must be at max 50 characters."),
    lastName: z
        .string({ error: errorMessages.string })
        .min(2, "Lastname must be at least 2 characters.")
        .max(50, "Lastname must be at max 50 characters."),
    email: z
        .string({ error: errorMessages.string })
        .trim()
        .pipe(z.email({ error: "Please, enter a valid e-mail" })),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long.")
        .max(64, "Password must be at most 64 characters long."),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
