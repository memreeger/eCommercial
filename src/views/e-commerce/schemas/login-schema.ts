import { z } from "zod";

const errorMessages = {
    string: "Please, enter a valid value.",
};
export const loginSchema = z.object({
    email: z
        .string({ error: errorMessages.string })
        .trim()
        .pipe(z.email({ error: "Please, enter a valid e-mail" })),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters long.")
        .max(64, "Password must be at most 64 characters long."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
